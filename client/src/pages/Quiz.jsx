import { useRef, useState } from "react";
import myImage from "../../src/Trivia.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_SCORE } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Quiz() {
  const { state } = useLocation();
  const { questions, category } = state;

  const stateRef = useRef();
  const navigate = useNavigate();
  const [addScore, { error }] = useMutation(SAVE_SCORE);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  stateRef.current = score;

  const endQuiz = () => {
    setTimeout(() => {
      handleScoreSubmit();
      navigate("/highscores");
    }, 5000);
  };

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      endQuiz();
    }
  };

  const handleScoreSubmit = async () => {
     if (stateRef.current > 0){
      const { data } = await addScore({
        variables: {
          category: category,
          score: stateRef.current,
          userName: Auth.getProfile().data.userName,
        },
      });
      console.log(data);
    }
  };

  window.addEventListener("popstate", (e) => {
    window.location.replace("/");
  });

  return (
    <div className="app">
    <div className="image">
      <img src={myImage} alt="Triva Logo" />
      </div>
      {showScore ? (
        <h3 className="score-section">
          You scored {score} out of {questions.length}! <br />
          You will now be redirected to the leaderboard.
        </h3>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
