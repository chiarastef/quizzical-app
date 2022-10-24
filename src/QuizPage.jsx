import axios from "axios";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

import React from "react";
import "./QuizPage.css";

export default function QuizPage() {
  const [questions, setQuestions] = React.useState([]);

  function sortRandom() {
    return 0.5 - Math.random();
  }

  React.useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(function (resp) {
        setQuestions(resp.data.results);
      });
  }, []);

  const questionsMap = questions.map((item) => {
    const answers = [];

    answers.push({
      answer: item.correct_answer,
      correct: true,
      selected: false,
    });

    item.incorrect_answers.forEach((element) =>
      answers.push({
        answer: element,
        correct: false,
        selected: false,
      })
    );

    function btnClick(e) {
      e.target.classList.toggle("answer-selected");

      answers.forEach((element) => {
        if (e.target.innerText === element.answer) {
          element.selected = !element.selected;
        }
      });
    }

    return (
      <div className="question-el" key={nanoid()}>
        <div className="question">{decode(item.question)}</div>
        <div className="answers">
          {answers.sort(sortRandom).map((answer) => (
            <button className="answer" key={nanoid()} onClick={btnClick}>
              {decode(answer.answer)}
            </button>
          ))}
        </div>
        <hr />
      </div>
    );
  });

  function checkAnswers() {
    console.log();
  }

  return (
    <div className="QuizPage">
      {questionsMap}
      <button className="btn QuizPage-btn" onClick={checkAnswers}>
        Check answers
      </button>
    </div>
  );
}
