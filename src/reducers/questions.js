import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import get from "lodash.get";
import { getFetchActionTypes } from "utils";

const initialState = {
  byId: {}
};

const questions = createReducer(initialState, {
  [getFetchActionTypes(actionTypes.FETCH_QUIZ_QUESTIONS).successType]: (
    state,
    { questions }
  ) => {
    questions.forEach(question => {
      state.byId[question.id] = question;
    });
  }
});

export default questions;

export const selectors = {
  selectQuestionById: (state, questionId) => state.byId[questionId],
  selectCorrectAnswerByQuestionId: (state, questionId) =>
    get(state.byId, [questionId, "correctAnswer"])
};
