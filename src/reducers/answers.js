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
  isFetching: false,
  byQuestionId: {}
};

const answers = createReset(
  actionTypes.RESTART_QUIZ,
  initialState,
  createReducer(initialState, {
    [actionTypes.SELECT_CHOICE]: (state, { questionId, choiceId }) => {
      set(state.byQuestionId, [questionId, "choiceId"], choiceId);
    },
    [actionTypes.ANSWER_QUESTION_REQUEST]: state => {
      state.isFetching = true;
    },
    [actionTypes.ANSWER_QUESTION_SUCCESS]: (
      state,
      { questionId, choiceId, answerId }
    ) => {
      state.isFetching = false;
      set(state.byQuestionId, [questionId, "choiceId"], choiceId);
      set(state.byQuestionId, [questionId, "answerId"], answerId);
    }
  })
);

export default answers;

const selectChoiceIdByQuestionId = (state, questionId) =>
  get(state.byQuestionId, [questionId, "choiceId"]);
const selectAnswerIdByQuestionId = (state, questionId) =>
  get(state.byQuestionId, [questionId, "answerId"]);

export const selectors = {
  selectIsFetchingAnswer: state => state.isFetching,
  selectChoiceIdByQuestionId,
  selectAnswerIdByQuestionId,
  selectAnswerResultByQuestionId: (state, questionId) => {
    const answerId = selectAnswerIdByQuestionId(state, questionId);
    const choiceId = selectChoiceIdByQuestionId(state, questionId);

    if (!answerId) {
      return ANSWER_RESULTS.none;
    } else if (answerId === choiceId) {
      return ANSWER_RESULTS.true;
    }

    return ANSWER_RESULTS.false;
  }
};
