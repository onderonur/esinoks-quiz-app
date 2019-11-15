import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchTypes } from "utils";

const initialState = {
  byQuizId: {}
};

const quizQuestions = createReducer(initialState, {
  [getFetchTypes(actionTypes.FETCH_QUIZ_QUESTIONS).succeeded]: (
    state,
    action
  ) => {
    const { quizId, response } = action;
    state.byQuizId[quizId] = response.result;
  },
  [getFetchTypes(actionTypes.CREATE_QUESTION).succeeded]: (state, action) => {
    const { quizId, question } = action;
    state.byQuizId[quizId].push(question.id);
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
