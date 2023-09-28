import React, {useState, useEffect} from 'react';

// may need to use regex to replace apostophes and double quotes

const Quiz = () => {
  // need useState hook
  const [dataState, setDataState] = useState([]);
  useEffect(() => {
    // drop down menu for user needs "text" to be the options for category / "value" = "category=9" etc
    // make variable for userSelection
    var category = 'category=9';
    var requestUrl = "https://opentdb.com/api.php?amount=10&$" + category + "&difficulty=easy&type=multiple"
    fetch(requestUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // change state
        const trimData = data.results.map((item) => {
          const options = [...item.incorrect_answers]
          options.push(item.correct_answer)
          let trimmedQuestion = item.question
          trimmedQuestion = trimmedQuestion.replace(/&quot;/g, '"')
          trimmedQuestion = trimmedQuestion.replace(/&#039;/g, "'")
          return {
            question: trimmedQuestion,
            correctAnswer: item.correct_answer,
            options: options
          }
        })
        setDataState([
          ...trimData
        ]);
      });
  }, []);
  //for logging stateful variables
  useEffect(() => {
    console.log(dataState)
    for (let i=0; i<dataState.length; i++){
      console.log(dataState[i].options)}
  },[dataState]);

  // question format loop
  const renderQuestions = (questionSet) => {
    return questionSet.map((item) => (
      <div>
        <h1>{item.question}</h1>
        {item.options.map((choice, index) => (
          <p>{index+1}. {choice}</p>
        ))}
      </div>
    ))
  }
  console.log(renderQuestions)

  return(
    <>
    {renderQuestions(dataState)}
    </>
  )
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

