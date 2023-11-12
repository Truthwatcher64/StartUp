window.addEventListener('load', loadNotification());

function loadNotification(){
    let holder = document.getElementById('notification-high-score');
    let temp = getHighestScore();
    if(temp === 'Play the Game'){
        holder.innerHTML = '<h4>Play The Game</h4>'
    }
    else{
        holder.innerHTML = '<h4>The next highest score is '+temp+'. Go try to beat it!</h4>'
    }
}

async function getHighestScore(){
    

    if(localStorage.getItem('userName')){
        let scoresText = localStorage.getItem('leaderScores');
        if (scoresText) {
            leaderScores = JSON.parse(scoresText);
        }
        scoresText = localStorage.getItem('scores')
        if (scoresText) {
            scores = JSON.parse(scoresText);
            let tempScore = leaderScores[0];
            for(let score in leaderScores){
                if(score[0]<score){
                    tempScore=score;
                }
                else{
                    break;
                }
            }
        }
        else{
            console.log(leaderScores[4].scores)
            return leaderScores[4].score;
        }
        if(tempScore == leaderScores[0]){
            console.log("You have the Highest Score")
            return "You have the Highest Score";
        }
        console.log(tempScore.score);
        return tempScore.score;
    }
    else {
        return "Play the Game"
    }

}

function playGame(){
        const canvas = this.document.getElementById('canvasDemo');
        const ctx = canvas.getContext('2d');
        canvas.width=1000;
        canvas.height=500;
        let allObstacles = []
        let score=0;
        gameover=false;

        class InputHandler{
            constructor(){
                this.keys=[];
                window.addEventListener('keydown', e => {
                    if((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')
                        && this.keys.indexOf(e.key) === -1){

                        this.keys.push(e.key);
                    }
                });

                window.addEventListener('keyup', e => {
                    if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
                        this.keys.splice(this.keys.indexOf(e.key), 1);
                    }
                });
            }
        }

        let counter=1;
        class Player {
            constructor(gamewidth, gameheight){
                this.gamewidth = gamewidth;
                this.gameheight = gameheight;
                this.width = 150;
                this.height = 150;
                this.x = 0;
                this.y = this.gameheight - this.height;
                this.image= document.getElementById('raptorImage');
                this.image2= document.getElementById('raptorImage2');
                this.frameX=0;
                this.maxFrame=31;
                this.speed=0;
                this.gravity=1.5;
                this.velY=0;
                this.fps=20;
                this.frameTimer=0;
                this.frameChangeInterval = 1000/this.fps;

            }
            draw(context){
                //context.fillStyle = 'blue';
                //context.fillRect(this.x, this.y, this.width, this.height,)
                if(this.frameX < 15){
                    context.drawImage(this.image, this.x-100, this.y, this.width+100, this.height)
                }  
                else{
                    context.drawImage(this.image2, this.x-100, this.y, this.width+100, this.height);
                }
                // context.strokeStyle='transparent';
                // context.beginPath();
                // context.arc(this.x+this.width/2, this.y+this.height/2, this.width/2, 0, Math.PI*2);
                // context.stroke();
                // context.beginPath();
                // context.beginPath();
                // context.arc(this.x+this.width*.4, this.y+this.height*.7, this.width/3.5, 0, Math.PI*2);
                // context.stroke();
                // context.arc(this.x+this.width*.6, this.y+this.height*.25, this.width/3.5, 0, Math.PI*2);
                // context.stroke();
                // context.arc(this.x+this.width*.2, this.y+this.height*.35, this.width/5, 0, Math.PI*2);
                // context.stroke();
            }
            update(input, deltaTime, allObstacles){
                allObstacles.forEach(obstacle => {
                    const dx=obstacle.x - (this.x);
                    const dy=obstacle.y - (this.y);
                    const dis=Math.sqrt(dx*dx + dy*dy);
                    if(dis< (obstacle.width/2.3 + this.width/2.3) && dis<(obstacle.height/2.3+this.height/2.3)){
                        gameover=true;
                    }
                });

                if(this.frameTimer > this.frameChangeInterval){
                    if(this.frameX <= this.maxFrame){
                        this.frameX++;
                    }
                    else{
                        this.frameX=0;
                    }
                }
                else{
                    this.frameTimer += deltaTime;
                }
                
                this.x += this.speed;
                
            
                if(input.keys.indexOf('ArrowRight') > -1){
                    this.speed=7;
                }
                else if(input.keys.indexOf('ArrowLeft') > -1){
                    this.speed=-7;
                }
                else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                    this.velY =-28;
                }
                else{
                    this.speed=0;
                }

                //horizontal
                if(this.x <0){
                    this.x=0;
                }
                else if(this.x>this.gamewidth - this.width){
                    this.x = this.gamewidth-this.width;
                }
                
                //vertical <button>Start Game</button>
                this.y+=this.velY;
                if(!this.onGround()){
                    this.velY += this.gravity;
                }
                else{
                    this.velY=0;
                }
                if(this.y>this.gameheight-this.height){
                    this.y = this.gameheight-this.height;
                }

            }
            onGround(){
                return this.y >=this.gameheight - this.height;
            }
        }

        class Background {
            constructor(gamewidth, gameheight){
                this.gamewidth=gamewidth;
                this.gameheight=gameheight;
                this.image=document.getElementById('background');
                this.x=0;
                this.y=0;
                this.width=2000;
                this.height=350;
            }
            draw(context){
                context.drawImage(this.image, this.x, this.y);
            }
        }

        class Obstacle{
            constructor(gamewidth, gameheight){
                this.gamewidth=gamewidth;
                this.gameheight=gameheight;
                let randomSize= Math.random() * 100 + 50;
                this.width = randomSize;
                this.height = randomSize;
                this.image =document.getElementById('rock');
                this.x=this.gamewidth
                this.y=this.gameheight-this.height;
                this.speed=5;
                let markedForDeletion=false;
            }
            draw(context){
                context.drawImage(this.image, this.x, this.y, this.width, this.height);
                context.strokeStyle='transparent';
                context.beginPath();
                let modifier=this.height-this.height*.7;
                context.strokeRect(this.x, this.y+modifier, this.width, this.height*.7);
            }
            update(){
                this.x -= this.speed;
                if(this.x < 0-this.width){
                    this.markedForDeletion=true;
                }
            }

        }

        
        function handleObstacle(deltaTime){
            if(obstacleTimer > (obstacleInterval + randomInterval)){
                allObstacles.push(new Obstacle(canvas.width, canvas.height));
                obstacleTimer=0;
                randomInterval= Math.random()*1500+500;
            }
            else{
                obstacleTimer+=deltaTime;
            }
            allObstacles.forEach(obstacle => {
                obstacle.draw(ctx);
                obstacle.update();
            });
            allObstacles=allObstacles.filter(obstacle => !obstacle.markedForDeletion);
            
        }

        function displayText(context){
            context.filstyle= 'black';
            context.font='40px Arial';
            context.fillText('Score: '+score.toFixed(0), 20, 50);
            if(gameover){
            context.filstyle= 'black';
            context.font='40px Arial';
            context.textAlign='center';
            context.fillText('Game Over', canvas.width/2, 100)
            context.fillText('Score: '+score.toFixed(0), canvas.width/2, 200);
            }
        }


        const input = new InputHandler();
        const player = new Player(canvas.width, canvas.height);
        const background=new Background(canvas.width, canvas.height);
        
        let lastTime=0;
        let obstacleTimer=0;
        let obstacleInterval=1500;
        let randomInterval= Math.random() * 2000 + 500;

        function animate(timeStamp){
            const deltaTime = timeStamp - lastTime;
            lastTime=timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background.draw(ctx);
            handleObstacle(deltaTime);
            player.draw(ctx);
            player.update(input, deltaTime, allObstacles);
            displayText(ctx);
            score=score+.05;
            if(!gameover){
            requestAnimationFrame(animate);
            }
            if(gameover){
                addFromGame(score.toFixed(0));
            }
        }
        animate(0);

}

function addFromGame(newScore){
    
    console.log(newScore);
    //save score to user list in local storage
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
        scores = JSON.parse(scoresText);
    }
    scores = this.updateScores(newScore, scores);
    console.log(scores)

    localStorage.setItem('scores', JSON.stringify(scores));

    //update the highscores list
    sendNewScore(newScore);
    

}

async function sendNewScore(score) {
const userName = this.getPlayerName();
const date = new Date().toLocaleDateString();
const newScore = {name: userName, score: score, date: date};

try {
    const response = await fetch('/api/leaderScore', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(newScore),
    });

    loadLeaderScores();
    getHighestScore();
} catch {
    //don't update
    //this.updateScoresLocal(newScore);
}
}

function updateScores(score, scores) {
console.log(score)
const newScore = { score: score };

let found = false;
for (const [i, prevScore] of scores.entries()) {
    if (score > prevScore.score) {
    scores.splice(i, 0, newScore);
    found = true;
    break;
    }
}

if (!found) {
    scores.push(newScore);
    }

    if (scores.length > 10) {
    scores.length = 10;
    }

    return scores;
}

    

