import { combineReducers } from "redux";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import * as actionTypes from "constants/actionTypes";

const isFetching = combineReducers({
  createQuiz: createIsFetching(actionTypes.CREATE_QUIZ),
  updateQuiz: createIsFetching(actionTypes.UPDATE_QUIZ),
  deleteQuiz: createIsFetching(actionTypes.DELETE_QUIZ_CONFIRMED)
});

export default isFetching;

export const selectors = {
  selectIsFetchingCreateQuiz: state => state.createQuiz,
  selectIsFetchingUpdateQuiz: state => state.updateQuiz,
  selectIsFetchingDeleteQuiz: state => state.deleteQuiz
};
