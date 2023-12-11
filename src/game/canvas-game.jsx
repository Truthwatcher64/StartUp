import React from 'react';
import Button from 'react-bootstrap/Button';
import './game.css'
import { useState, useEffect } from 'react';

export function RaptorGame(){
        let notificationList=  <p id="other-users" className="flex-item" style={{ textAlign: 'left', margin: '5px' }}>Notifications Here</p>
        const GameEndEvent = 'gameEnd';
        const GameStartEvent = 'gameStart';
        const [gameOver, setGameOver] = useState(false);
        const [currentlyRunning, setCurrentlyRunning] = useState(false);
        const [score, setScore] = useState(0);
        const [allObstacles, setAllObstacles] = useState([]);
        
        useEffect(() => {
          loadNotification();
          configureWebSocket();
        }, []);
      
        function loadNotification() {
          // Implementation of loadNotification function
        }
      
        function loadUsername() {
          // Implementation of loadUsername function
        }
      
        function getHighestScore() {
          // Implementation of getHighestScore function
        }
      
        function getPlayerName() {
          return localStorage.getItem('userName') ?? 'A Player';
        }
      
        function playGame() {
          // Implementation of playGame function
        }
      
        function addFromGame(newScore) {
          // Implementation of addFromGame function
        }
      
        async function sendNewScore(score) {
          // Implementation of sendNewScore function
        }
      
        function updateScores(score) {
          // Implementation of updateScores function
        }
      
        function configureWebSocket() {
          // Implementation of configureWebSocket function
        }
      
        function displayMsg(cls, from, msg) {
          // Implementation of displayMsg function
        }
      
        function broadcastEvent(from, type, value) {
          // Implementation of broadcastEvent function
        }
    return (
        <div>
            <Button className='startButton' onClick={playGame}>Start Game</Button>
            <p id="notification-high-score" className="flex-item" style={{ textAlign: 'left', margin: '5px' }}></p>
            
            <div id='game-sidebar'>
            <canvas id="canvasDemo" width="1000" height="500" style={{ border: '1px solid #000' }}></canvas>
            {notificationList}
            </div>
        </div>
    );
}

export default RaptorGame;
