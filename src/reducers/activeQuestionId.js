import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import createReset from "./higherOrderReducers/createReset";

const initialState = null;

const activeQuestionId = createReset(
  actionTypes.RESTART_QUIZ_CONFIRMED,
  initialState,
  createReducer(initialState, {
    [actionTypes.SELECT_QUESTION]: (state, { questionId }) => questionId
    // [actionTypes.ANSWER_QUESTION_SUCCESS]: (state, { choiceId, answerId }) =>
    //   choiceId === answerId ? null : state
  })
);

export default activeQuestionId;

export const selectors = {
  selectActiveQuestionId: state => state
};
