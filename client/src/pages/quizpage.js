import React, {useEffect} from 'react';

const Quiz = () => {
    useEffect(() => {

    }, []);
    return (
      <div>
        <h1>Quiz Page! </h1>
        <p>This is the home page.</p>
      </div>
    );
  }
  
export default Quiz;


// here is what we need for the api call

// `https://opentdb.com/api.php?amount=10&${category}&difficulty=easy&type=multiple`

// general knowledge "category=9"
// mythology         "category=20"
// sports            "category=21"
// geography         "category=22"
// history           "category=23"
// politics          "category=24"
// art               "category=25"
// celebrities       "category=26"
// animals           "category=27"
// vehicles          "category=28"

