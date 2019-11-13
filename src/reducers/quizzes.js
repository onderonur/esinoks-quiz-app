import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  byId: {},
  allIds: []
};

const quizzes = createReducer(initialState, {
  [getFetchActionTypes(actionTypes.FETCH_AUTH_USER_QUIZZES).successType]: (
    state,
    { collection, authUserId }
  ) => {
    const currentQuizzes = selectQuizzes(state);
    const nonAuthUserQuizzes = currentQuizzes.filter(
      quiz => quiz.authorId !== authUserId
    );
    const nextQuizzes = [...nonAuthUserQuizzes, ...collection];

    const byId = {};
    nextQuizzes.forEach(quiz => {
      byId[quiz.id] = quiz;
    });

    state.byId = byId;

    const nextQuizIds = nextQuizzes.map(quiz => quiz.id);
    state.allIds = nextQuizIds;
  },
  [getFetchActionTypes(actionTypes.FETCH_QUIZ).successType]: (
    state,
    { quiz }
  ) => {
    state.byId[quiz.id] = quiz;

    const found = state.allIds.includes(quiz.id);
    if (!found) {
      state.allIds.push(quiz.id);
    }
  },
  [getFetchActionTypes(actionTypes.DELETE_QUIZ_CONFIRMED).successType]: (
    state,
    { quizId }
  ) => {
    delete state.byId[quizId];
    state.allIds = state.allIds.filter(id => id !== quizId);
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
