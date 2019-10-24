import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  byId: {},
  allIds: []
};

const quizzes = createReducer(initialState, {
  [actionTypes.RECEIVE_QUIZZES]: (state, { quizzes }) => {
    const newAllIds = quizzes.map(quiz => quiz.id);

    state.allIds.forEach(id => {
      if (!newAllIds.includes(id)) {
        delete state.byId[id];
      }
    });

    quizzes.forEach(quiz => {
      state.byId[quiz.id] = quiz;
    });

    state.allIds = newAllIds;
  },
  [actionTypes.RECEIVE_QUIZ]: (state, { quiz }) => {
    state.byId[quiz.id] = quiz;

    const found = state.allIds.includes(quiz.id);
    if (!found) {
      state.allIds.push(quiz.id);
    }
  }
});

export default quizzes;

const selectQuizIds = state => state.allIds;
const selectQuizById = (state, quizId) => state.byId[quizId];
const selectQuizzes = state => {
  const quizIds = selectQuizIds(state);
  const quizzes = quizIds.map(quizId => selectQuizById(state, quizId));
  return quizzes;
};
const selectQuizIdsByAuthorId = (state, authorId) => {
  const quizzes = selectQuizzes(state);
  const authorQuizzes = quizzes.filter(quiz => quiz.authorId === authorId);
  const authorQuizIds = authorQuizzes.map(quiz => quiz.id);
  return authorQuizIds;
};

export const selectors = {
  selectQuizIds,
  selectQuizById,
  selectQuizzes,
  selectQuizIdsByAuthorId
};
