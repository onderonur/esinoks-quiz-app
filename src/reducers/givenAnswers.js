import * as actions from "actions";
import set from "lodash.set";
import get from "lodash.get";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

const answerQuestion = (state, action) => {
  const { payload } = action;
  const { quizId, questionId, choiceIndex } = payload;
  set(state, [quizId, questionId], choiceIndex);
};

const clearQuizAnswers = (state, action) => {
  const { payload } = action;
  const { quizId } = payload;
  delete state[quizId];
};

const givenAnswers = createReducer(initialState, {
  [actions.answerQuestion]: answerQuestion,
  [actions.exitFromQuiz]: clearQuizAnswers,
  [actions.restartQuiz]: clearQuizAnswers
});

export default givenAnswers;

const selectGivenAnswersOfQuiz = (state, quizId) => get(state, quizId, {});
const selectGivenAnswer = (state, quizId, questionId) => {
  const quizAnswers = selectGivenAnswersOfQuiz(state, quizId);
  const questionAnswer = get(quizAnswers, questionId);
  return questionAnswer;
};

export const selectors = {
  selectGivenAnswersOfQuiz,
  selectGivenAnswer
};
