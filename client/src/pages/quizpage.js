import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [dataState, setDataState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('9');

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (selectedCategory) {
      // Fetch quiz data based on the selected category
      const requestUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple&&encode=base64`;

      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // will look into this later for parsing the response correctly - will need to attach encoding method to URL string "&encode=url3986"
          // const decodedRes = decodeURIComponent(data.results[0].question);
          // const jsonRes = JSON.parse(decodedRes)
          // console.log(jsonRes)
          const trimData = data.results.map((item) => {
            let trimmedCorrect = atob(item.correct_answer);

            let trimmedIncorrect = item.incorrect_answers.map((wrongTrim) => {
                wrongTrim = atob(wrongTrim);
                return wrongTrim;
            });

            const options = trimmedIncorrect;
            options.push(trimmedCorrect);

            let trimmedQuestion = atob(item.question);
            
            return {
              question: trimmedQuestion,
              correctAnswer: trimmedCorrect,
              options: options,
            };
          });
          setDataState([...trimData]);
        });
    }
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const renderQuestions = () => {
    return dataState.map((item, index) => {
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
    <form onSubmit={(e) => {handleFormSubmit(e)}}>
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
      {/* add submit button - move renderQuentions into submit button
      submit button needs conditional logic to createHighscore if dataState && userChoices exist
      maybe button can link to user highscore page on submit */}
      <button type='submit'>Submit</button>
      {dataState.length > 0 && renderQuestions()}
    </form>
  );
};

export default Quiz;

// need a logout function
// possibly need to add support for more character encodings - "utf-8" etc --- look into Webpack Encoding Plugin npm install webpack-encoding-plugin