const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
// Use this to contact the scores database
const apiRouter = express.Router();
app.use(`/api`, apiRouter);
app.set('trust proxy', true);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});



let allScores= [];
const authCookieName = 'token';

/* Storing users*/
// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("Input: "+req.body.userName);
  console.log("Input: "+req.body.password);
  if (await DB.getUser(req.body.userName)) {
    res.status(409).send({ msg: 'Existing user' });
    console.log("User already exists");
  } else {
  console.log("Input: "+req.body.userName);
  console.log("Input: "+req.body.password);
    const user = await DB.createUser(req.body.userName, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});


// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  console.log("Search: "+req.body.userName);
  const user = await DB.getUser(req.body.userName);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// GetUser returns information about a user
apiRouter.get('/user/:userName', async (req, res) => {
  const user = await DB.getUser(req.params.userName);
  if (user) {
    const token = req?.cookies.token;
    res.send({ username: user.username, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});


/*Cookies */
// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

/*Storing scores */
// GetScores
apiRouter.get('/leaderScores', async (req, res)=>{
  allScores= await DB.findScores();
  res.send(allScores);
})

// SubmitScore
apiRouter.post('/leaderScore', async (req, res) => {
  allScores= await DB.findScores();
  console.log(allScores);
  scores = updateLeaderScores(req.body, allScores);
  await DB.saveScores(scores);
  allScores= await DB.findScores();
  res.send(allScores);
});

//updates the scores list locally
function updateLeaderScores(newScore, allScores){
  let greater=false;
  //search and see if score is in current list
  for(const [i, oldScore] of allScores.entries()){
    if(parseInt(newScore.score, 10) > parseInt(oldScore.score, 10)){
      allScores.splice(i, 0, newScore);
      greater=true;
      break;
    }
  }
  //add new score to end of list
  if(!greater){
      allScores.push(newScore);
   
  }
  if(allScores.length>5){
    allScores.length=5;
  }
  return allScores;
}

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});
