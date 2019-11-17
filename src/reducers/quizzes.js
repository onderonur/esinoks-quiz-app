import * as actions from "actions";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";
import schemas from "schemas";

const removeQuiz = (state, action) => {
  delete state[action.quizId];
};

const quizzes = createEntitiesSlice(
  schemas.quizSchema.key,
  {},
  {
    [actions.DELETE_QUIZ._SUCCEEDED]: removeQuiz
  }
);

export default quizzes;

const selectQuiz = (state, quizId) => state[quizId];

export const selectors = {
  selectQuiz
};
