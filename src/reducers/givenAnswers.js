import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import set from "lodash.set";
import get from "lodash.get";
import createReset from "./higherOrderReducers/createReset";

export const ANSWER_RESULTS = {
  true: "true",
  false: "false",
  none: "none"
};

const initialState = {
  byQuestionId: {}
};

const givenAnswers = createReset(
  actionTypes.RESTART_QUIZ_CONFIRMED,
  initialState,
  createReducer(initialState, {
    [actionTypes.ANSWER_QUESTION]: (state, { questionId, choiceIndex }) => {
      set(state.byQuestionId, [questionId], choiceIndex);
    }
    // [actionTypes.ANSWER_QUESTION_REQUEST]: state => {
    //   state.isFetching = true;
    // },
    // [actionTypes.ANSWER_QUESTION_SUCCESS]: (
    //   state,
    //   { questionId, choiceId, answerIndex }
    // ) => {
    //   // state.isFetching = false;
    //   // set(state.byQuestionId, [questionId, "choiceId"], choiceId);
    //   set(state.byQuestionId, [questionId, "answerIndex"], answerIndex);
    // }
  })
);

export default givenAnswers;

export const selectors = {
  selectGivenAnswerByQuestionId: (state, questionId) =>
    get(state.byQuestionId, [questionId])
};
