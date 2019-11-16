import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { utilTypes, removeItemFromArrayMutation } from "utils";

const initialState = [];

const authUserQuizzes = createReducer(initialState, {
  [utilTypes(actionTypes.FETCH_AUTH_USER_QUIZZES).succeeded]: (
    state,
    action
  ) => action.response.result,
  [utilTypes(actionTypes.CREATE_QUIZ).succeeded]: (state, action) => {
    const { quizId } = action;
    state.push(quizId);
  },
  [utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: (
    state,
    action
  ) => {
    const { quizId } = action;
    removeItemFromArrayMutation(state, quizId);
  }
});

export default authUserQuizzes;

export const selectors = {
  selectAuthUserQuizIds: state => state
};
