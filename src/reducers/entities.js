import merge from "lodash.merge";
import produce from "immer";
import get from "lodash.get";
import { getFetchTypes } from "utils";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  quizzes: {},
  questions: {}
};

const entities = (state = initialState, action) => {
  const entities = get(action, ["response", "entities"]);
  return produce(state, draft => {
    if (entities) {
      draft = merge(draft, entities);
    } else {
      switch (action.type) {
        case getFetchTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded:
          delete draft.quizzes[action.quizId];
          break;
        case getFetchTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded:
          delete draft.quizzes[action.questionId];
          break;
        default:
      }
    }
  });
};

export default entities;

export const selectors = {
  selectQuiz: (state, quizId) => state.quizzes[quizId],
  selectQuestion: (state, questionId) => state.questions[questionId]
};
