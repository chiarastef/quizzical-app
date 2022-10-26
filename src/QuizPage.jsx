import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

import Buttons from "./Buttons";

import "./QuizPage.css";

export default function QuizPage(props) {
  const [questions, setQuestions] = React.useState([]);

  // API call to get questions from Open Trivia Database (https://opentdb.com/)
  React.useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(function (resp) {
        setQuestions(resp.data.results);
      });
  }, []);

  // Array of all answers to all questions
  const allAnswers = [];

  // Build and render question element
  const questionsMap = questions.map((question) => {
    // Array of answers for every question
    const answers = [];

    // Push correct and incorrect answers objects to array (and decode text in case of html entities)
    answers.push({
      answer: decode(question.correct_answer),
      correct: true,
      selected: false,
    });

    question.incorrect_answers.forEach((answer) =>
      answers.push({
        answer: decode(answer),
        correct: false,
        selected: false,
      })
    );

    // Random sorting function to shuffle array
    function sortRandom() {
      return 0.5 - Math.random();
    }

    // Select answer
    function btnClick(e) {
      e.target.classList.toggle("answer-selected");

      // Change value of selected answer and push answer object to allAnswers array
      answers.forEach((answerEl) => {
        if (e.target.innerText === answerEl.answer) {
          answerEl.selected = !answerEl.selected;
        }
        allAnswers.push(answerEl);
      });
    }

    return (
      <div className="question-el" key={nanoid()}>
        <div className="question">{decode(question.question)}</div>
        <div className="answer-el">
          {answers.sort(sortRandom).map((answerEl) => (
            <button className="answer" key={nanoid()} onClick={btnClick}>
              {answerEl.answer}
            </button>
          ))}
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="QuizPage">
      {questionsMap}
      <Buttons answers={allAnswers} startQuiz={props.startQuiz} />
    </div>
  );
}
