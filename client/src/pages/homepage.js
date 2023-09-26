import React from 'react';
import Login from './login';
import Auth from '../utils/auth';

function HomePage() {
  const loggedIn = Auth.loggedIn();
  return (
    <div>
      <h1>Welcome to the Triva App!!!</h1>
      {!loggedIn ? <Login />: null}
    </div>
  );
}

export default HomePage;