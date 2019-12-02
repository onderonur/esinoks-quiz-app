import { removeItemFromArrayMutation } from "utils";
import * as actions from "actions";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

const receiveQuizQuestions = (state, action) => {
  const { payload } = action;
  const { quizId, response } = payload;
  state[quizId] = response.result;
};

const addQuizQuestion = (state, action) => {
  const { payload } = action;
  const { quizId, response } = payload;
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const { result: newQuizId } = response;
  quizQuestionIds.push(newQuizId);
};

const removeQuiz = (state, action) => {
  const { payload } = action;
  const { quizId } = payload;
  delete state[quizId];
};

const removeQuizQuestion = (state, action) => {
  const { payload } = action;
  const { quizId, questionId } = payload;
  const quizQuestionIds = state[quizId];
  removeItemFromArrayMutation(quizQuestionIds, questionId);
};

// Bu slice'ları ve ilgili selector'lerini ayrı dosyalara al
const quizQuestions = createReducer(initialState, {
  [actions.fetchQuizQuestions.succeeded]: receiveQuizQuestions,
  [actions.createQuestion.succeeded]: addQuizQuestion,
  [actions.deleteQuiz.succeeded]: removeQuiz,
  [actions.deleteQuestion.succeeded]: removeQuizQuestion
});

export default quizQuestions;

const selectQuizQuestionIds = (state, quizId) => state[quizId] || [];
const selectTotalQuestionCountByQuizId = (state, quizId) => {
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const { length } = quizQuestionIds;
  return length;
};
const selectQuizQuestionIndex = (state, quizId, questionId) => {
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const quizQuestionIndex = quizQuestionIds.indexOf(questionId);
  return quizQuestionIndex;
};

export const selectors = {
  selectQuizQuestionIds,
  selectTotalQuestionCountByQuizId,
  selectQuizQuestionIndex
};
