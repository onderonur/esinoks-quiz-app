import { utilTypes, removeItemFromArrayMutation } from "utils";
import * as actionTypes from "constants/actionTypes";
import createReducer from "./higherOrderReducers/createReducer";

const initialState = {};

const receiveQuizQuestions = (state, action) => {
  const { quizId, response } = action;
  state[quizId] = response.result;
};

const addQuizQuestion = (state, action) => {
  const { quizId, response } = action;
  const newQuestionId = response.result;
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  quizQuestionIds.push(newQuestionId);
};

const removeQuiz = (state, action) => {
  const { quizId } = action;
  delete state[quizId];
};

const removeQuizQuestion = (state, action) => {
  const { quizId, questionId } = action;
  const quizQuestionIds = state[quizId];
  removeItemFromArrayMutation(quizQuestionIds, questionId);
};

// Bu slice'ları ve ilgili selector'lerini ayrı dosyalara al
const quizQuestions = createReducer(initialState, {
  [utilTypes(actionTypes.FETCH_QUIZ_QUESTIONS).succeeded]: receiveQuizQuestions,
  [utilTypes(actionTypes.CREATE_QUESTION).succeeded]: addQuizQuestion,
  [utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: removeQuiz,
  [utilTypes(actionTypes.DELETE_QUESTION_CONFIRMED)
    .succeeded]: removeQuizQuestion
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
