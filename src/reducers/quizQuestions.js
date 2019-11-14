import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  byQuizId: {}
};

const quizQuestions = createReducer(initialState, {
  [getFetchActionTypes(actionTypes.FETCH_QUIZ_QUESTIONS).successType]: (
    state,
    action
  ) => {
    const { quizId, response } = action;
    const questionIds = response.map(question => question.id);
    state.byQuizId[quizId] = questionIds;
  },
  [getFetchActionTypes(actionTypes.CREATE_QUESTION).successType]: (
    state,
    action
  ) => {
    const { quizId, question } = action;
    state.byQuizId[quizId].push(question.id);
  },
  [getFetchActionTypes(actionTypes.DELETE_QUIZ_CONFIRMED).successType]: (
    state,
    action
  ) => {
    const { quizId } = action;
    // Removing the question references of the deleted quiz.
    delete state.byQuizId[quizId];
  },
  [getFetchActionTypes(actionTypes.DELETE_QUESTION_CONFIRMED).successType]: (
    state,
    action
  ) => {
    const { quizId, questionId } = action;
    state.byQuizId[quizId] = state.byQuizId[quizId].filter(
      id => id !== questionId
    );
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
