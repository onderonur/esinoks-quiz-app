import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import get from "lodash.get";
import { getFetchActionTypes } from "utils";

const initialState = {
  byId: {}
};

const storeQuestion = (state, action) => {
  const { question } = action;
  state.byId[question.id] = question;
};

const questions = createReducer(initialState, {
  [getFetchActionTypes(actionTypes.FETCH_QUIZ_QUESTIONS).successType]: (
    state,
    action
  ) => {
    const { response } = action;
    response.forEach(question => {
      state.byId[question.id] = question;
    });
  },
  [getFetchActionTypes(actionTypes.CREATE_QUESTION).successType]: storeQuestion,
  [getFetchActionTypes(actionTypes.UPDATE_QUESTION).successType]: storeQuestion,
  [getFetchActionTypes(actionTypes.DELETE_QUESTION_CONFIRMED).successType]: (
    state,
    action
  ) => {
    const { questionId } = action;
    delete state.byId[questionId];
  }
});

export default questions;

export const selectors = {
  selectQuestionById: (state, questionId) => state.byId[questionId],
  selectCorrectAnswerByQuestionId: (state, questionId) =>
    get(state.byId, [questionId, "correctAnswer"])
};
