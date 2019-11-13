import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  byQuizId: {}
};

const quizQuestions = createReducer(initialState, {
  [getFetchActionTypes(actionTypes.FETCH_QUIZ_QUESTIONS).successType]: (
    state,
    { quizId, collection }
  ) => {
    const questionIds = collection.map(question => question.id);
    state.byQuizId[quizId] = questionIds;
  },
  [getFetchActionTypes(actionTypes.DELETE_QUIZ_CONFIRMED).successType]: (
    state,
    { quizId }
  ) => {
    // Removing the question references of the deleted quiz.
    delete state.byQuizId[quizId];
  }
});

export default quizQuestions;

const selectQuestionIdsByQuizId = (state, quizId) =>
  state.byQuizId[quizId] || [];

export const selectors = {
  selectQuestionIdsByQuizId,
  selectQuestionIndex: (state, quizId, questionId) => {
    const questionIds = selectQuestionIdsByQuizId(state, quizId);
    return questionIds.indexOf(questionId);
  },
  selectTotalQuestionCountByQuizId: (state, quizId) => {
    const questionIds = selectQuestionIdsByQuizId(state, quizId);
    return questionIds.length;
  }
};
