import React from 'react';
import './about.css';

export function About(props) {

  let imgEl = <img alt="raptor" src="/assets/raptor_1.png" width="400" height="250" className="RaptorPng"/>;
  

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        <div id='picture' className='picture-box' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '50px'}}>
          {imgEl}
        </div>

        <p className="lead">
            Raptor run is a game designed to be a sidescrolling platformer similar to the dino game from Chrome.
            </p>
            <p className="lead">
                Be forewarned this game is much harder with added obstacles. 
            </p>
            <p className="lead">
                If you sign in with a username you can view your best scores 
                as well as check the hghest scores that have been achieved of all time.
            </p>
            <p className="lead">
                To play start the game and use the arrow keys to avoid hitting obstacles. The longer you survive the more points you will get.
            </p>
            <p className="lead">
                If you do not have JavaScript enabled the game will not work. Make sure JavaScript is enabled before starting. 
            </p>
      </div>
    </main>
  );
}