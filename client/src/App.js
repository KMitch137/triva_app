// import React from "react";
// import TriviaContainer from "../src/components/triviaContainer";

// const App = () => <TriviaContainer />;


// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from '../src/pages/homepage';
// import Quiz from '../src/pages/quizpage';
// import Highscores from '../src/pages/highscores';
// import Signup from '../src/pages/signup';
// import Login from '../src/pages/login';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={Home} />
//           <Route path="/quiz" element={Quiz} />
//           <Route path="/highscores" element={Highscores} />
//           <Route path="/signup" element={Signup} />
//           <Route path="/login" element={Login} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom'; 

import Home from '../src/pages/homepage';
import Quiz from '../src/pages/quizpage';
import Highscores from '../src/pages/highscores';
import Signup from '../src/pages/signup';
import Login from '../src/pages/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/highscores" element={<Highscores />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;