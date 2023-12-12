import React from 'react';

import { Unauthenticated } from './unauthenticated.jsx';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css'

export function Login({ userName, authState, onAuthChange }) {
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(() => {
        const random = Math.floor(Math.random() * 1000);
          fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
            .then((response) => response.json())
            .then((data) => {
              const imgUrl = `https://picsum.photos/id/${data[0].id}/900/300`;
              

              setImageUrl(imgUrl);
            })
          .catch();
    }, []);

    let imgEl = '';

    if (imageUrl) {
      imgEl = <img src={imageUrl} alt='stock background' />;
    }

  return (
    <div className='flex-box-login bg-secondary'>
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
      <div id='picture' className='picture-box'>
          {imgEl}
        </div>
    </main>
    </div>
  );
}