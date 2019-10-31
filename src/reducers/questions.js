import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import get from "lodash.get";

const initialState = {
  byId: {},
  allIds: []
};

const questions = createReducer(initialState, {
  [actionTypes.RECEIVE_QUIZ_QUESTIONS]: (state, { questions }) => {
    const newAllIds = questions.map(question => question.id);

    state.allIds.forEach(id => {
      if (!newAllIds.includes(id)) {
        delete state.byId[id];
      }
    });

    questions.forEach(question => {
      state.byId[question.id] = question;
    });

    state.allIds = newAllIds;
  }
});

export default questions;

export const selectors = {
  selectAllQuestionIds: state => state.allIds,
  selectQuestionIndexById: (state, questionId) =>
    state.allIds.indexOf(questionId),
  selectTotalQuestionsCount: state => state.allIds.length,
  selectQuestionById: (state, questionId) => state.byId[questionId],
  selectCorrectAnswerByQuestionId: (state, questionId) =>
    get(state.byId, [questionId, "correctAnswer"])
};
