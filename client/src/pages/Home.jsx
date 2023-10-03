import React from 'react';
import Login from './login';
import Auth from '../utils/auth';
import '../../src/index.css';
import myImage from '../../src/Trivia.png';
import Categories from './Category';


function Home() {
  const loggedIn = Auth.loggedIn();
  return (
    <div>
      <h1>Welcome to the Triva App!!!</h1>
    <div className="image">
      <img src={myImage} alt="Triva Logo" />
    </div>
      {!loggedIn ? <Login  /> : <div className="clform" ><Categories/></div>}
    </div>
  );
}

export default Home;
