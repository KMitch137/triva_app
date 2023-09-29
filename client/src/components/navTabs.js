

import React from 'react';
import { Link } from 'react-router-dom';

function NavTabs({ currentPage }) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/quiz" className={currentPage === 'quiz' ? 'nav-link active' : 'nav-link'}>
          View Quiz categories!
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className={currentPage === 'signup' ? 'nav-link active' : 'nav-link'}>
          Sign Up!
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className={currentPage === 'login' ? 'nav-link active' : 'nav-link'}>
          Login!
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/highscores" className={currentPage === 'highscores' ? 'nav-link active' : 'nav-link'}>
          View High Scores!
        </Link>
      </li>
    </ul>


  );
}

export default NavTabs;