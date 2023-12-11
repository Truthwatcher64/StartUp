import React from 'react';
import { RaptorGame } from './canvas-game';

export function Game(props) {
  return (
    <div>
    <main className='bg-secondary'>
      <div>
        {RaptorGame()}
      </div>
    </main>
    </div>
  );
}
