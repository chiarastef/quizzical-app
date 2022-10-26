import React from "react";
import StartPage from "./StartPage";
import QuizPage from "./QuizPage";
import "./App.css";

export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);

  function startQuiz() {
    setQuizStarted((prevState) => !prevState);
  }

  return (
    <div className="App">
      {quizStarted ? (
        <QuizPage startQuiz={startQuiz} />
      ) : (
        <StartPage startQuiz={startQuiz} />
      )}
    </div>
  );
}
