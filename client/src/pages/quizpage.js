// import React, { useState, useEffect } from 'react';
// import '../../src/index.css';

// // may need to use regex to replace apostophes and double quotes

// const Quiz = () => {
//   // need useState hook
//   const [dataState, setDataState] = useState([]);
//   useEffect(() => {
//     // drop down menu for user needs "text" to be the options for category / "value" = "category=9" etc
//     // make variable for userSelection
//     var category = 'category=9';
//     var requestUrl = "https://opentdb.com/api.php?amount=10&$" + category + "&difficulty=easy&type=multiple"
//     fetch(requestUrl)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         // change state
//         const trimData = data.results.map((item) => {
//           const options = [...item.incorrect_answers]
//           options.push(item.correct_answer)
//           let trimmedQuestion = item.question
//           trimmedQuestion = trimmedQuestion.replace(/&quot;/g, '"')
//           trimmedQuestion = trimmedQuestion.replace(/&#039;/g, "'")
//           return {
//             question: trimmedQuestion,
//             correctAnswer: item.correct_answer,
//             options: options
//           }
//         })
//         setDataState([
//           ...trimData
//         ]);
//       });
//   }, []);
//   //for logging stateful variables
//   useEffect(() => {
//     console.log(dataState)
//     for (let i = 0; i < dataState.length; i++) {
//       console.log(dataState[i].options)
//     }
//   }, [dataState]);


//   // This code will render the answers in a random order mixing up the correct answer with incorrect answers:
//   const renderQuestions = (questionSet) => {
//     return questionSet.map((item) => {
//       // Shuffle the answer options
//       const shuffledOptions = [...item.options];
//       for (let i = shuffledOptions.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
//       }

//       return (
//         <div key={item.question}>
//           <h3>{item.question}</h3>
//           {shuffledOptions.map((choice, index) => (
//             <div key={index}>
//               <input
//                 type="radio"
//                 id={`answer-${item.question}-${index}`}
//                 name={`answer-${item.question}`}
//                 value={`${index + 1}.${choice}`}
//               />
//               <label htmlFor={`answer-${item.question}-${index}`}>{choice}</label>
//             </div>
//           ))}
//         </div>
//       );
//     });
//   };

//   console.log(renderQuestions)

//   return (
//     <>
//       {renderQuestions(dataState)}
//     </>
//   )
// }
// export default Quiz;


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

import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [dataState, setDataState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Default no category

  useEffect(() => {
    if (selectedCategory) {
      // Fetch quiz data based on the selected category
      const requestUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple`;

      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          const trimData = data.results.map((item) => {
            const options = [...item.incorrect_answers];
            options.push(item.correct_answer);
            let trimmedQuestion = item.question;
            trimmedQuestion = trimmedQuestion.replace(/&quot;/g, '"');
            trimmedQuestion = trimmedQuestion.replace(/&#039;/g, "'");
            return {
              question: trimmedQuestion,
              correctAnswer: item.correct_answer,
              options: options,
            };
          });
          setDataState([...trimData]);
        });
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const renderQuestions = (questionSet) => {
    return questionSet.map((item, index) => {
      const shuffledOptions = [...item.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      return (
        <div key={index}>
          <h3>{item.question}</h3>
          {shuffledOptions.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <input
                type="radio"
                id={`answer-${index}-${choiceIndex}`}
                name={`answer-${index}`}
                value={`${choice}`}
              />
              <label htmlFor={`answer-${index}-${choiceIndex}`}>{choice}</label>
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div>
      <label htmlFor="category-select">Select a Category:</label>
      <select
        id="category-select"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
          <option value="9">General Knowledge</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
      </select>

      {dataState.length > 0 && renderQuestions(dataState)}
    </div>
  );
};

export default Quiz;


