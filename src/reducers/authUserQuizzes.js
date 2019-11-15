import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchTypes } from "utils";

const initialState = [];

const authUserQuizzes = createReducer(initialState, {
  [getFetchTypes(actionTypes.FETCH_AUTH_USER_QUIZZES).succeeded]: (
    state,
    action
  ) => action.response.result,
  [getFetchTypes(actionTypes.CREATE_QUIZ).succeeded]: (state, action) => {
    state.push(action.quizId);
  },
  [getFetchTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: (
    state,
    action
  ) => {
    const { quizId } = action;
    return state.filter(id => id !== quizId);
  }
});

export default authUserQuizzes;

export const selectors = {
  selectAuthUserQuizIds: state => state
};
