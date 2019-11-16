import get from "lodash.get";
import { utilTypes } from "utils";
import * as actionTypes from "constants/actionTypes";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";

const questions = createEntitiesSlice(
  "questions",
  {},
  {
    [utilTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded]: (
      state,
      action
    ) => {
      const { questionId } = action;
      delete state[questionId];
    }
  }
);

export default questions;

const selectQuestion = (state, questionId) => state[questionId];
const selectCorrectAnswerByQuestionId = (state, questionId) => {
  const question = selectQuestion(state, questionId);
  return get(question, "correctAnswer");
};

export const selectors = {
  selectQuestion,
  selectCorrectAnswerByQuestionId
};
