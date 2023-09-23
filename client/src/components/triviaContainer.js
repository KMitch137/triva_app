import React, { useState } from 'react';
import NavTabs from './navTabs';
import Home from '../pages/homepage';
import Quiz from '../pages/quizpage';
import Highscores from '../pages/highscores';
import Signup from '../pages/signup';
import Login from '../pages/login';

export default function PortfolioContainer() {
    const [currentPage, setCurrentPage] = useState('home');


const renderPage = () => {
    if (currentPage === 'home') {
      return <Home />;
    }
    if (currentPage === 'quiz') {
      return <Quiz />;
    }
    if (currentPage === 'highscores') {
      return <Highscores />;
    }

    if (currentPage === 'signup') {
        return <Signup />;
    }

    if (currentPage === 'login') {
        return <Login />;
    }
    
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </div>
  );
}