import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./question-cart";
interface Props {
  question: string;
  answer: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  useranswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestion: number;
}

const QuestionCart = ({
  question,
  answer,
  callback,
  useranswer,
  questionNr,
  totalQuestion,
}: Props) => {
  console.log(
    question,
    answer,
    callback,
    useranswer,
    questionNr,
    totalQuestion,
    "from question card"
  );
  return (
    <>
      <Wrapper>
        <p className="number">Queston:{questionNr + "/" + totalQuestion}</p>
        <p
          className="qustion"
          dangerouslySetInnerHTML={{ __html: question }}
        ></p>
        <div>
          {answer.map((ans) => (
            <ButtonWrapper
              key={ans}
              correct={useranswer?.correctAnswer === ans}
              userClick={useranswer?.answer === ans}
            >
              <button
                disabled={useranswer ? true : false}
                onClick={(e) => callback(e)}
                value={ans}
              >
                <span dangerouslySetInnerHTML={{ __html: ans }}></span>
              </button>
            </ButtonWrapper>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default QuestionCart;
