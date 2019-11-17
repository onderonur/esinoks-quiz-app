import createReducer from "./higherOrderReducers/createReducer";
import * as actions from "actions";
import set from "lodash.set";
import get from "lodash.get";
import createReset from "./higherOrderReducers/createReset";

const initialState = {
  byQuestionId: {}
};

const answerQuestion = (state, action) => {
  const { questionId, choiceIndex } = action;
  set(state.byQuestionId, [questionId], choiceIndex);
};

const givenAnswers = createReset(
  [actions.RESTART_QUIZ._CONFIRMED, actions.EXITED_FROM_QUIZ],
  initialState,
  createReducer(initialState, {
    [actions.ANSWER_QUESTION]: answerQuestion
  })
);

export default givenAnswers;

export const selectors = {
  selectGivenAnswerByQuestionId: (state, questionId) =>
    get(state, ["byQuestionId", questionId])
};
