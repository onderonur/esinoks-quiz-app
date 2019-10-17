import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = null;

const activeQuestionId = createReducer(initialState, {
  [actionTypes.SELECT_QUESTION]: (state, { questionId }) => questionId
});

export default activeQuestionId;

export const selectors = {
  selectActiveQuestionId: state => state
};
