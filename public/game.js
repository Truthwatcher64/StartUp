window.addEventListener('load', loadNotification());

function loadNotification(){
    let holder = document.getElementById('notification-high-score');
    let temp = getHighestScore();
    console.log("To output: "+temp);
    temp=parseInt(temp, 10);
    if(temp>0){
        if(temp == -1){
            holder.innerHTML = '<h4>Play The Game</h4>';
        }
        
        else{
            holder.innerHTML = '<h4>The next highest score is '+temp+'. Go try to beat it!</h4>';
        }
    }
    else if(temp === -2){
        holder.innerHTML ='<h4>You have the high score! Good Job.</h4>';
    }
    else{
        holder.innerHTML = '<h4>Play The Game</h4>';
    }
}

function getHighestScore(){
    let scoresText = localStorage.getItem('leaderScores');
    if (scoresText) {
        leaderScores = JSON.parse(scoresText);
        tempScore=leaderScores[4].score;
    }
    else{
        return -1;
    }
    
    if(localStorage.getItem('leaderScores')){
    if(localStorage.getItem('userName') != null){
        if(localStorage.getItem('scores')){
        scoresText = localStorage.getItem('scores');
        console.log("scorestext: "+scoresText);
        scores = JSON.parse(scoresText);
        console.log(scores);
        topUserScore=parseInt(scores[0].score, 10);
        console.log("Best User: "+topUserScore)
        if(topUserScore>leaderScores[0].score){
            return -2;
        }
        if (scoresText) {
            console.log('temp');
            let tempScore = parseInt(leaderScores[0].score);
            breakvar=true;
            console.log(tempScore);
            for(let score in leaderScores){
                if(topUserScore<leaderScores[score].score && breakvar===true){
                    console.log("Here");
                    tempScore=leaderScores[score].score;
                }
                else if(breakvar===true){
                    console.log(leaderScores[score-1].score);
                    tempScore=leaderScores[score-1].score;
                    console.log("High: "+tempScore);
                    breakvar=false;
                    return tempScore;
                    
                }
            }
        }
        else{
            console.log('High: '+leaderScores[4].scores)
            return leaderScores[4];
        }
        return tempScore;
    }
}
    else {
        return -1;
    }
}

}

function playGame(){
    let currently_running=false;
        if(currently_running){
            /*
            Don't start a new game until previous game is over
            */
        }
        else{
            currently_running=true;
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
                currently_running=false;
            }
        }
        animate(0);
    }
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
    if(loadUsername){}
    const userName = localStorage.getItem('username');
    const newScore = {score: score};

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


function updateScores(score) {
"use strict";
console.log(score);
let scores = [];
const scoresText = localStorage.getItem('scores');
if (scoresText) {
  scores = JSON.parse(scoresText);
}
const newScore={score : score}

let found = false;

for (const [i, prevScore] of scores.entries()) {
    console.log("Times "+i)
    console.log(newScore.score+" "+prevScore.score);
    if (parseInt(newScore.score, 10) > parseInt(prevScore.score, 10)) {
        console.log(newScore.score+" "+prevScore.score);
        scores.splice(i, 0, newScore);
        found = true;
        break;
    }
}
console.log(scores);
if (!found) {
    scores.push(newScore);
}

if (scores.length > 5) {
scores.pop();
}

return scores;
}

    

