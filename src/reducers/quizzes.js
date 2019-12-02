import * as actions from "actions";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";
import schemas from "schemas";

const initialState = {};

const removeQuiz = (state, action) => {
  delete state[action.payload.quizId];
};

const quizzes = createEntitiesSlice(schemas.quizSchema.key, initialState, {
  [actions.deleteQuiz.succeeded]: removeQuiz
});

export default quizzes;

const selectQuiz = (state, quizId) => state[quizId];

export const selectors = {
  selectQuiz
};
