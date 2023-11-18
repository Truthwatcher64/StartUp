const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');


// Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db('RaptorScores');
const collection = db.collection('Scores')


async function load(){

  // Test that you can connect to the database
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });
}

async function saveScores(scores){
  console.log("Save\n"+scores);
  //clear the old data
  console.log(await collection.deleteMany());
  //await collection.delete_many({});
  //insert the new list
  console.log(scores);
  await collection.insertMany(scores);
}

async function findScores(){
  // const query = { score: { $gt: 0, $lt: 900 } };
  // const options = {
  //   limit: 5,
  // };
  // const scoresList = collection.find(query, options);
  // console.log("find")
  // console.log(scoresList.toArray[0])
  // console.log(scoresList[0])
  // //console.log(scoresList);
  // return scoresList.toArray();

  scoresList=collection.find({}).toArray(function(err, documents) {
    if (err) {
      console.error('Error:', err);
      return;
    }
  })
  return scoresList;
  // const query = { score: { $gt: 0, $lt: 900 } };
  // const options = {
  //   sort: { score: -1 },
  //   limit: 10,
  // };
  // const cursor = collection.find(query, options);
  // return cursor.toArray();
}

module.exports = { saveScores, findScores };
