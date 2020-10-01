import { shffleArr } from "./utility";
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };
export const fetchQuizQuestions = async (
  amound: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amound}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endPoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shffleArr([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  }));
};
