import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "actions";
import createReset from "./higherOrderReducers/createReset";

const initialState = null;

const activeQuestionId = createReset(
  [
    actionTypes.UNSELECT_QUESTION,
    actionTypes.EXITED_FROM_QUIZ,
    actionTypes.RESTART_QUIZ._CONFIRMED
  ],
  initialState,
  createReducer(initialState, {
    [actionTypes.SELECT_QUESTION]: (state, action) => action.questionId
  })
);

export default activeQuestionId;

export const selectors = {
  selectActiveQuestionId: state => state
};
