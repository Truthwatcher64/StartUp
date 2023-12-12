import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './index/login';
import { Game } from './game/game';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './index/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
    <div className='body bg-secondary text-light'>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='navbar-brand'>
            Raptor Run
          </div>
          <menu className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href='/'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='game'>
                Game
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='scores'>
                Scores
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='about'>
                About
              </a>
            </li>
          </menu>
        </nav>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
          exact
        />
        
        <Route path='/game' element={<Game userName={userName} />} />
        <Route path='/scores' element={<Scores userName={userName} />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className='bg-dark text-white-50'>
        <div className='container-fluid'>
          <span className='text-reset'>Alex B</span>
          <a href="https://github.com/burgeale002/StartUp" className='text-reset'>Github Repository</a>
        </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
