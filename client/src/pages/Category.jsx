import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [dataState, setDataState] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("9");
  const navigate = useNavigate();



  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      // Fetch quiz data based on the selected category
      const requestUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple&&encode=base64`;

      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const trimData = data.results.map((item) => {
            let trimmedCorrect = atob(item.correct_answer);
            let trimmedIncorrect = item.incorrect_answers.map((wrongTrim) => {
              wrongTrim = atob(wrongTrim);
              return wrongTrim;
            });
            const options = trimmedIncorrect;
            options.push(trimmedCorrect);

            const shuffledOptions = [...options];
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledOptions[i], shuffledOptions[j]] = [
                shuffledOptions[j],
                shuffledOptions[i],
              ];
            }


            let trimmedQuestion = atob(item.question);
            console.log(trimmedQuestion);
            return {
              question: trimmedQuestion,
              correctAnswer: trimmedCorrect,
              options: shuffledOptions,
            };
        
          });
          setDataState([...trimData])

          navigate("/quiz", {
            state: { category: selectedCategory, questions: trimData },
          });
        });
    }
  };



  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <h3 className="tctr">Select a Category:</h3>
      <label htmlFor="category-select"></label>
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
        {/* <option value="24">Politics</option> //THESE TWO DON'T WORK
        <option value="25">Art</option> */}
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
      </select>
      {/* add submit button - move renderQuentions into submit button
      submit button needs conditional logic to createHighscore if dataState && userChoices exist
      maybe button can link to user highscore page on submit */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Categories;
