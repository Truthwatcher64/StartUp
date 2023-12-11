import React from 'react';
import Button from 'react-bootstrap/Button';
import './game.css'
import { useState, useEffect, useRef } from 'react';
import raptorImage from '../../assets/raptor_1.png'
import raptorImage2 from '../../assets/raptor_2.png'
import backgroundWhite from '../../assets/background.png'

export function RaptorGame(){
        let notificationList=  <p id="other-users" className="flex-item" style={{ textAlign: 'left', margin: '5px' }}></p>
        const GameEndEvent = 'gameEnd';
        const GameStartEvent = 'gameStart';
        const [gameOver, setGameOver] = useState(false);
        const [currentlyRunning, setCurrentlyRunning] = useState(false);
        const [scores, setScores] = useState([]);
        const [allObstacles, setAllObstacles] = useState([]);
        const [socket, setSocket] = useState(null);
        const [leaderScores, setLeaderScores] = useState([]);
        const canvasRef = useRef(null);
        
        useEffect(() => {
          loadNotification();
          configureWebSocket();

          
        }, []);
      
        function loadNotification() {
            let holder = document.getElementById('notification-high-score');
            if(getHighestScore===-1){
                holder.innerHTML = '<h4>Play The Game</h4>';
            }
            else{
                let temp = getHighestScore();
                console.log("To output: "+temp);
                temp=parseInt(temp, 10);
                if(temp>0 && temp!=null){
                    if(temp == -1){
                        holder.innerHTML = '<h4>Play The Game</h4>';
                    }
                    
                    else{
                        holder.innerHTML = '<h4>The next highest score is '+temp+'. Go try to beat it!</h4>';
                    }
                }
                else if(temp === -2 && temp != null){
                    holder.innerHTML ='<h4>You have the high score! Good Job.</h4>';
                }
                else{
                    holder.innerHTML = '<h4>Play The Game</h4>';
                }
            }
        
            configureWebSocket();
        }
      
        function loadUsername() {
            let name=localStorage.getItem('userName');
            //console.log(name);
            if(name){
                document.getElementById("userScores-table").innerHTML=name;
                return true;
            }
            else{
                document.getElementById('userScores-table').innerText="Not signed in";
                return false;
            }
        }
      
        function getHighestScore() {
            let tempScore=0;
            let scoresText = localStorage.getItem('leaderScores');
            if (scoresText) {
                setLeaderScores(JSON.parse(scoresText));
                console.log(leaderScores);
                
                switch(leaderScores.length){
                    case(0):
                        return -1;
                    case(1):
                        tempScore=leaderScores[0].score;
                        break;
                    case(2):
                        tempScore=leaderScores[1].score;
                        break;
                    case(3):
                        tempScore=leaderScores[2].score;
                        break;
                    case(4):
                        tempScore=leaderScores[3].score;
                        break;
                    case(5):
                        tempScore=leaderScores[4].score;
                        break;
                }
            }
            else{
                return -1;
            }
            
            if(localStorage.getItem('leaderScores')){
            if(localStorage.getItem('userName') != null){
                if(localStorage.getItem('scores')){
                scoresText = localStorage.getItem('scores');
                console.log("scorestext: "+scoresText);
                let scores=JSON.parse(scoresText);
                console.log("Array "+scores)
                setScores(JSON.parse(scoresText));
                console.log(scores);
                if(parseInt(scores[0].score) != undefined){
                let topUserScore=parseInt(scores[0].score, 10);
                console.log("Best User: "+topUserScore)
                if(topUserScore>leaderScores[0].score){
                    return -2;
                }
                if (scoresText) {
                    console.log('temp');
                    let tempScore = parseInt(leaderScores[0].score);
                    let breakvar=true;
                    console.log(tempScore);
                    for(let score in leaderScores){
                        if(topUserScore<leaderScores[score].score && breakvar===true){
                            console.log("Here");
                            tempScore=leaderScores[score].score;
                        }
                        else if(breakvar===true && score>0){
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
            }
                setScores(scores);
                return tempScore;
            }
        }
            else {
                return -1;
            }
        }
        }
      
        function getPlayerName() {
          return localStorage.getItem('userName') ?? 'A Player';
        }
      
        function playGame() {
            // Let other players know a new game has started
            broadcastEvent(getPlayerName(), GameStartEvent, {});

            let currently_running=false;
                if(currently_running){
                    /*
                    Don't start a new game until previous game is over
                    */
                }
                else{
                    currently_running=true;
                //const canvas = this.document.getElementById('background');
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width=1000;
                canvas.height=500;
                let allObstacles = []
                let score=0;
                let gameover=false;

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
                        //this.image= raptorImage
                        this.image=new Image()
                        this.image.src='../../assets/raptor_1.png'
                        this.image.onload = () => {
                           
                          };
                          this.image.onerror = (error) => {
                            console.error('Error loading image:', error);
                          };
                        if(this.image){
                            console.log("Loaded Raptor1 Properly");
                        }
                        this.image2=new Image()
                        this.image2.src= raptorImage2
                        this.image2.onload= ()=>{

                        };
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
                        if(this.frameX < 15){
                            context.drawImage(this.image, this.x-100, this.y, this.width+100, this.height)
                        }  
                        else{
                            context.drawImage(this.image2, this.x-100, this.y, this.width+100, this.height);
                        }
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
                        this.image=backgroundWhite
                        this.x=0;
                        this.y=0;
                        this.width=2000;
                        this.height=350;
                    }
                    draw(context){
                        context.fillStyle = 'white';
                        context.fillRect(this.x, this.y, this.width, this.height);
                    }
                }

                class Obstacle{
                    constructor(gamewidth, gameheight){
                        this.gamewidth=gamewidth;
                        this.gameheight=gameheight;
                        let randomSize= Math.random() * 100 + 50;
                        this.width = randomSize;
                        this.height = randomSize;
                        this.image=new Image()

                        this.image.src = '../../assets/rock.png'
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
                        console.log("new score: "+score.toFixed(0))
                        addFromGame(score.toFixed(0));
                        currently_running=false;
                        // Let other players know the game has concluded
                        console.log(score.toFixed(0))
                        broadcastEvent(getPlayerName(), GameEndEvent, parseInt(score.toFixed(0)));
                    }
                }
                animate(0);
            }
        }
      
        function addFromGame(newScore) {
            console.log(newScore);
            //save score to user list in local storage
            let scores = [];
            const scoresText = localStorage.getItem('scores');
            if (scoresText) {
                scores = JSON.parse(scoresText);
            }
            scores = updateScores(newScore, scores);
            console.log(scores)
        
            localStorage.setItem('scores', JSON.stringify(scores));
        
            //update the highscores list
            sendNewScore(newScore);        }
      
        async function sendNewScore(score) {
            if(loadUsername){
                const userName = localStorage.getItem('username');
                
            }
            const newScore = {score: score};
        
            try {
                const response = await fetch('/api/leaderScore', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newScore),
                });
               
                getHighestScore();
            } catch(error) {
                console.error(error);
                //don't update
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
      
        function configureWebSocket() {
            const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
            let newsocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
            newsocket.onopen = (event) => {
                displayMsg('system', 'game', 'connected');
            };
            newsocket.onclose = (event) => {
                displayMsg('system', 'game', 'disconnected');
            };
            newsocket.onmessage = async (event) => {
                const msg = JSON.parse(await event.data.text());
                if (msg.type === GameEndEvent) {
                console.log(msg.value)
                displayMsg('player', msg.from, `scored ${parseInt(msg.value)}`);
                } else if (msg.type === GameStartEvent) {
                displayMsg('player', msg.from, `started a new game`);
                }
            };
            setSocket(newsocket);
        }
      
        function displayMsg(cls, from, msg) {
            let chatText = document.querySelector('#other-users');
            //cap the max size of the text
            if(chatText.length>300){
                chatText="";
            }
            chatText.innerHTML =
              `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;        }
      
        function broadcastEvent(from, type, value) {
            const event = {
                from: from,
                type: type,
                value: value,
              };
              socket.send(JSON.stringify(event));
        }

    return (
        <div>
            <Button className='startButton' onClick={playGame}>Start Game</Button>
            <p id="notification-high-score" className="flex-item" style={{ textAlign: 'left', margin: '5px' }}></p>
            
            <div id='game-sidebar'>
            <canvas ref={canvasRef} width={1000} height={500} style={{ border: '1px solid #000' }}></canvas>
            {notificationList}
            </div>
        </div>
    );
};

export default RaptorGame;
