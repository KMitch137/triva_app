import React from 'react';
import Login from './login';
import Auth from '../utils/auth';
import '../../src/index.css';
import myImage from '../../src/Trivia.png';
import Quiz from './quizpage';


function HomePage() {
  const loggedIn = Auth.loggedIn();
  return (
    <div>
      <h1>Welcome to the Triva App!!!</h1>
      <img src={myImage} alt="Triva Logo" />
      {!loggedIn ? <Login  /> : <Quiz/>}
    </div>
  );
}

export default HomePage;
