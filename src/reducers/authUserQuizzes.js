import createReducer from "./higherOrderReducers/createReducer";
import * as actions from "actions";
import { removeItemFromArrayMutation } from "utils";

const initialState = [];

const receiveQuizzes = (state, action) => action.response.result;
const addQuiz = (state, action) => {
  const { response } = action;
  const { result: quizId } = response;
  state.push(quizId);
};
const removeQuiz = (state, action) => {
  const { quizId } = action;
  removeItemFromArrayMutation(state, quizId);
};

const authUserQuizzes = createReducer(initialState, {
  [actions.FETCH_AUTH_USER_QUIZZES._SUCCEEDED]: receiveQuizzes,
  [actions.CREATE_QUIZ._SUCCEEDED]: addQuiz,
  [actions.DELETE_QUIZ._SUCCEEDED]: removeQuiz
});

export default authUserQuizzes;

export const selectors = {
  selectAuthUserQuizIds: state => state
};
