import { utilTypes } from "utils";
import * as actionTypes from "constants/actionTypes";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";
import schemas from "schemas";

const removeQuiz = (state, action) => {
  delete state[action.quizId];
};

const quizzes = createEntitiesSlice(
  schemas.quiz.key,
  {},
  {
    [utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: removeQuiz
  }
);

export default quizzes;

const selectQuiz = (state, quizId) => state[quizId];

export const selectors = {
  selectQuiz
};
