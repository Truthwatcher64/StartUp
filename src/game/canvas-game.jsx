import React from 'react';
import Button from 'react-bootstrap/Button';
import './game.css'

export function RaptorGame(props) {
    let canvas=<canvas id="gameCanvas" width="1000" height="500" style={{ border: '3px solid #000000' }} />
    let notificationList=  <p id="other-users" className="flex-item" style={{ textAlign: 'left', margin: '5px' }}>Notifications Here</p>


    return (
        <div>
            <Button className='startButton'>
                Start
            </Button>
            <div id='game-sidebar'>
            {canvas}
            {notificationList}
            </div>
        </div>
    );
}

