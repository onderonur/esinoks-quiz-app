import get from "lodash.get";
import * as actions from "actions";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";
import schemas from "schemas";

const removeQuestion = (state, action) => {
  const { questionId } = action;
  delete state[questionId];
};

const questions = createEntitiesSlice(
  schemas.questionSchema.key,
  {},
  {
    [actions.DELETE_QUESTION._SUCCEEDED]: removeQuestion
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
