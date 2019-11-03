import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import createReset from "./higherOrderReducers/createReset";

const initialState = null;

const activeQuestionId = createReset(
  [
    actionTypes.UNSELECT_QUESTION,
    actionTypes.EXITED_FROM_QUIZ,
    actionTypes.RESTART_QUIZ_CONFIRMED
  ],
  initialState,
  createReducer(initialState, {
    [actionTypes.SELECT_QUESTION]: (state, { questionId }) => questionId
  })
);

export default activeQuestionId;

export const selectors = {
  selectActiveQuestionId: state => state
};
