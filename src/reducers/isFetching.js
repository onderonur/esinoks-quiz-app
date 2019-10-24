import { combineReducers } from "redux";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import * as actionTypes from "constants/actionTypes";

const isFetching = combineReducers({
  createQuiz: createIsFetching(actionTypes.CREATE_QUIZ),
  updateQuiz: createIsFetching(actionTypes.UPDATE_QUIZ),
  deleteQuiz: createIsFetching(actionTypes.DELETE_QUIZ_CONFIRMED),
  createQuestion: createIsFetching(actionTypes.CREATE_QUESTION),
  updateQuestion: createIsFetching(actionTypes.UPDATE_QUESTION),
  deleteQuestion: createIsFetching(actionTypes.DELETE_QUESTION_CONFIRMED)
});

export default isFetching;

export const selectors = {
  selectIsFetchingByKey: (state, key) => state[key],
  selectIsFetchingCreateQuiz: state => state.createQuiz,
  selectIsFetchingUpdateQuiz: state => state.updateQuiz,
  selectIsFetchingDeleteQuiz: state => state.deleteQuiz,
  selectIsFetchingCreateQuestion: state => state.createQuestion,
  selectIsFetchingUpdateQuestion: state => state.updateQuestion,
  selectIsFetchingDeleteQuestion: state => state.deleteQuestion
};
