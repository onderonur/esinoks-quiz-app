import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import get from "lodash.get";
import { getFetchTypes } from "utils";

const initialState = {
  byId: {}
};

const storeQuestion = (state, action) => {
  const { question } = action;
  state.byId[question.id] = question;
};

const questions = createReducer(initialState, {});

export default questions;

export const selectors = {
  selectCorrectAnswerByQuestionId: (state, questionId) =>
    get(state, ["byId", questionId, "correctAnswer"])
};
