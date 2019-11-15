import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchTypes, removeItemFromArrayMutation } from "utils";

const initialState = {
  byQuizId: {}
};

const quizQuestions = createReducer(initialState, {
  [getFetchTypes(actionTypes.FETCH_QUIZ_QUESTIONS).succeeded]: (
    state,
    action
  ) => {
    const { quizId, response } = action;
    state.byQuizId[quizId] = response.entities.quizQuestions[quizId].questions;
  },
  [getFetchTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: (
    state,
    action
  ) => {
    const { quizId } = action;
    // Removing the question references of the deleted quiz.
    delete state.byQuizId[quizId];
  },
  [getFetchTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded]: (
    state,
    action
  ) => {
    const { quizId, questionId } = action;
    removeItemFromArrayMutation(state.byQuizId[quizId], questionId);
  }
});

export default quizQuestions;

const selectQuizQuestionIds = (state, quizId) => state.byQuizId[quizId] || [];

export const selectors = {
  selectQuizQuestionIds,
  selectQuestionIndex: (state, quizId, questionId) => {
    const questionIds = selectQuizQuestionIds(state, quizId);
    return questionIds.indexOf(questionId);
  },
  selectTotalQuestionCountByQuizId: (state, quizId) => {
    const questionIds = selectQuizQuestionIds(state, quizId);
    return questionIds.length;
  }
};
