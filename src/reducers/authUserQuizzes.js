import * as actions from "actions";
import { removeItemFromArrayMutation } from "utils";
import { createReducer } from "@reduxjs/toolkit";

const initialState = [];

const receiveQuizzes = (state, action) => action.payload.response.result;

const addQuiz = (state, action) => {
  const { payload } = action;
  const { response } = payload;
  const { result: quizId } = response;
  state.push(quizId);
};

const removeQuiz = (state, action) => {
  const { payload } = action;
  const { quizId } = payload;
  removeItemFromArrayMutation(state, quizId);
};

const authUserQuizzes = createReducer(initialState, {
  [actions.fetchAuthUserQuizzes.succeeded]: receiveQuizzes,
  [actions.createQuiz.succeeded]: addQuiz,
  [actions.deleteQuiz.succeeded]: removeQuiz
});

export default authUserQuizzes;

export const selectors = {
  selectAuthUserQuizIds: state => state
};
