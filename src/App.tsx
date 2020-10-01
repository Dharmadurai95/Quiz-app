import React, { useState } from "react";
import QuestionCart from "./component/QuestionCart";
import { Wrapper } from "./style";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./component/api";
import "./app.css";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTION = 10;

const App = () => {
  const [loading, setloading] = useState(false);
  const [question, setquestion] = useState<QuestionState[]>([]);
  const [number, setnumber] = useState(0);
  const [userAnswer, setuserAnswer] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState(0);
  const [gameOver, setgameOver] = useState(true);

  console.log(question);
  //get questions

  const getQuestion = async () => {
    setloading(true);
    setgameOver(false);
    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setquestion(newQuestion);
    setscore(0);
    setuserAnswer([]);
    setnumber(0);
    setloading(false);
  };
  //check answer button
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    //user answer
    const answer = e.currentTarget.value;
    // check correct answer or not
    const correct = question[number].correct_answer === answer;
    if (correct) setscore((prev) => prev + 1);
    const AnswerObject = {
      question: question[number].question,
      answer,
      correct,
      correctAnswer: question[number].correct_answer,
    };

    setuserAnswer((prev) => [...prev, AnswerObject]);
  };

  //next question
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTION) {
      setgameOver(true);
    } else {
      setnumber(nextQuestion);
    }
  };
  return (
    <div className="wrapper">
      <div className="container">
        <Wrapper>
          <h1>React Quiz</h1>
          {gameOver || userAnswer.length === TOTAL_QUESTION ? (
            <button className="start" onClick={getQuestion}>
              Start
            </button>
          ) : null}

          {loading ? <p>Question Loading ....</p> : null}
          {!gameOver && <p className="score">Score:{score}</p>}

          {!gameOver && !loading && (
            <QuestionCart
              questionNr={number + 1}
              totalQuestion={TOTAL_QUESTION}
              answer={question[number].answers}
              question={question[number].question}
              callback={checkAnswer}
              useranswer={userAnswer ? userAnswer[number] : undefined}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswer.length === number + 1 &&
          number !== TOTAL_QUESTION - 1 ? (
            <button className="next" onClick={nextQuestion}>
              next Question
            </button>
          ) : null}
        </Wrapper>
      </div>
    </div>
  );
};
export default App;

// https://opentdb.com/api.php?amount=10&category=9&type=multiple;

// https://opentdb.com/api.php?amount=10&type=multiple
