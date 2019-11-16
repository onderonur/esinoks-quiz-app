import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { utilTypes, removeItemFromArrayMutation } from "utils";

const initialState = [];

const receiveQuizzes = (state, action) => action.response.result;
const addQuiz = (state, action) => {
  const { quizId } = action;
  state.push(quizId);
};
const removeQuiz = (state, action) => {
  const { quizId } = action;
  removeItemFromArrayMutation(state, quizId);
};

const authUserQuizzes = createReducer(initialState, {
  [utilTypes(actionTypes.FETCH_AUTH_USER_QUIZZES).succeeded]: receiveQuizzes,
  [utilTypes(actionTypes.CREATE_QUIZ).succeeded]: addQuiz,
  [utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: removeQuiz
});

export default authUserQuizzes;

export const selectors = {
  selectAuthUserQuizIds: state => state
};
