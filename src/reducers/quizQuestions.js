import { utilTypes, removeItemFromArrayMutation } from "utils";
import * as actionTypes from "constants/actionTypes";
import createReducer from "./higherOrderReducers/createReducer";

const initialState = {};

// Bu slice'ları ve ilgili selector'lerini ayrı dosyalara al
const quizQuestions = createReducer(initialState, {
  [utilTypes(actionTypes.FETCH_QUIZ_QUESTIONS).succeeded]: (
    state,
    action
  ) => {
    const { quizId, response } = action;
    state[quizId] = response.result;
  },
  [utilTypes(actionTypes.CREATE_QUESTION).succeeded]: (state, action) => {
    const { quizId, response } = action;
    const newQuestionId = response.result;
    const quizQuestionIds = selectQuizQuestionIds(state, quizId);
    quizQuestionIds.push(newQuestionId);
  },
  [utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: (
    state,
    action
  ) => {
    const { quizId } = action;
    delete state[quizId];
  },
  [utilTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded]: (
    state,
    action
  ) => {
    const { quizId, questionId } = action;
    const quizQuestionIds = state[quizId];
    removeItemFromArrayMutation(quizQuestionIds, questionId);
  }
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
