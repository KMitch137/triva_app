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
            let trimmedCorrect = item.correct_answer;
            trimmedCorrect = trimmedCorrect.replace(/&quot;/g, '"');
            trimmedCorrect = trimmedCorrect.replace(/&#039;/g, "'");
            let trimmedIncorrect = item.incorrect_answers.map((wrongTrim) => {
                wrongTrim = wrongTrim.replace(/&quot;/g, '"');
                wrongTrim = wrongTrim.replace(/&#039;/g, "'");
                return wrongTrim;
            });
            const options = trimmedIncorrect;
            options.push(trimmedCorrect);
            let trimmedQuestion = item.question;
            trimmedQuestion = trimmedQuestion.replace(/&quot;/g, '"');
            trimmedQuestion = trimmedQuestion.replace(/&#039;/g, "'");
            return {
              question: item.question,
              correctAnswer: trimmedCorrect,
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


