import { utilTypes } from "utils";
import * as actionTypes from "constants/actionTypes";
import createEntitiesSlice from "./higherOrderReducers/createEntitiesSlice";

const quizzes = createEntitiesSlice(
  "quizzes",
  {},
  {
    [utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded]: (
      state,
      action
    ) => {
      delete state[action.quizId];
    }
  }
);

export default quizzes;

const selectQuiz = (state, quizId) => state[quizId];

export const selectors = {
  selectQuiz
};
