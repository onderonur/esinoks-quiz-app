import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  byQuizId: {}
};

const { successType: DELETE_QUIZ_CONFIRMED_SUCCESS } = getFetchActionTypes(
  actionTypes.DELETE_QUIZ_CONFIRMED
);

const quizQuestions = createReducer(initialState, {
  [actionTypes.RECEIVE_QUIZ_QUESTIONS]: (state, { quizId, questions }) => {
    const questionIds = questions ? questions.map(question => question.id) : [];
    state.byQuizId[quizId] = questionIds;
  },
  [DELETE_QUIZ_CONFIRMED_SUCCESS]: (state, { quizId }) => {
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
