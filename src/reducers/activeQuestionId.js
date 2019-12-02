import * as actions from "actions";
import { createReducer } from "@reduxjs/toolkit";

const initialState = null;

const selectQuestion = (state, action) => action.payload.questionId;

const reset = (state, action) => initialState;

const activeQuestionId = createReducer(initialState, {
  [actions.selectQuestion]: selectQuestion,
  [actions.exitFromQuiz]: reset,
  [actions.restartQuiz]: reset
});

export default activeQuestionId;

export const selectors = {
  selectActiveQuestionId: state => state
};
