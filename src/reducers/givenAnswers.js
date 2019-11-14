import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import set from "lodash.set";
import get from "lodash.get";
import createReset from "./higherOrderReducers/createReset";

const initialState = {
  byQuestionId: {}
};

const givenAnswers = createReset(
  [actionTypes.RESTART_QUIZ_CONFIRMED, actionTypes.EXITED_FROM_QUIZ],
  initialState,
  createReducer(initialState, {
    [actionTypes.ANSWER_QUESTION]: (state, action) => {
      const { questionId, choiceIndex } = action;
      set(state.byQuestionId, [questionId], choiceIndex);
    }
  })
);

export default givenAnswers;

export const selectors = {
  selectGivenAnswerByQuestionId: (state, questionId) =>
    get(state.byQuestionId, [questionId])
};
