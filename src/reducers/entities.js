import merge from "lodash.merge";
import produce from "immer";
import get from "lodash.get";
import { getFetchTypes, removeItemFromArrayMutation } from "utils";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  quizzes: {},
  questions: {},
  quizQuestions: {}
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
          delete draft.quizQuestions[action.quizId];
          break;
        case getFetchTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded:
          const { quizId, questionId } = action;
          delete selectors.selectQuestion(draft, questionId);
          // TODO: Bunun daha basit bir yolunu bul
          const quizQuestionIds = selectors.selectQuizQuestionIds(
            draft,
            quizId
          );
          removeItemFromArrayMutation(quizQuestionIds, questionId);
          break;
        default:
      }
    }
  });
};

export default entities;

const selectQuiz = (state, quizId) => state.quizzes[quizId];
const selectQuestion = (state, questionId) => state.questions[questionId];
const selectQuizQuestionIds = (state, quizId) =>
  get(state, ["quizQuestions", quizId, "questions"], []);
const selectQuizQuestions = (state, quizId) => {
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const quizQuestions = quizQuestionIds.map(questionId =>
    selectQuestion(state, questionId)
  );
  return quizQuestions;
};

export const selectors = {
  selectQuiz,
  selectQuestion,
  selectQuizQuestionIds,
  selectQuizQuestions
};
