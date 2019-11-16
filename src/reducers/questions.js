import get from "lodash.get";
import { utilTypes } from "utils";
import * as actionTypes from "constants/actionTypes";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";
import schemas from "schemas";

const removeQuestion = (state, action) => {
  const { questionId } = action;
  delete state[questionId];
};

const questions = createEntitiesSlice(
  schemas.question.key,
  {},
  {
    [utilTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded]: removeQuestion
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
