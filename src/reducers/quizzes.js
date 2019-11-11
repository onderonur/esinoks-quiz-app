import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  byId: {},
  allIds: []
};

const storeQuizzes = (state, { quizzes }) => {
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
};

const { successType: FETCH_QUIZZES_SUCCESS } = getFetchActionTypes(
  actionTypes.FETCH_QUIZZES
);
const { successType: FETCH_MORE_QUIZZES_SUCCESS } = getFetchActionTypes(
  actionTypes.FETCH_MORE_QUIZZES
);
const { successType: FETCH_AUTH_USER_QUIZZES_SUCCESS } = getFetchActionTypes(
  actionTypes.FETCH_AUTH_USER_QUIZZES
);
const { successType: DELETE_QUIZ_CONFIRMED_SUCCESS } = getFetchActionTypes(
  actionTypes.DELETE_QUIZ_CONFIRMED
);

const quizzes = createReducer(initialState, {
  [actionTypes.RECEIVE_QUIZZES]: storeQuizzes,
  [FETCH_QUIZZES_SUCCESS]: storeQuizzes,
  [FETCH_MORE_QUIZZES_SUCCESS]: (state, { quizzes }) => {
    quizzes.forEach(quiz => {
      state.byId[quiz.id] = quiz;
    });

    const newQuizIds = quizzes.map(quiz => quiz.id);
    state.allIds = [...state.allIds, ...newQuizIds];
  },
  [FETCH_AUTH_USER_QUIZZES_SUCCESS]: (state, { quizzes, authUserId }) => {
    const currentQuizzes = selectQuizzes(state);
    const nonAuthUserQuizzes = currentQuizzes.filter(
      quiz => quiz.authorId !== authUserId
    );
    const nextQuizzes = [...nonAuthUserQuizzes, ...quizzes];

    const byId = {};
    nextQuizzes.forEach(quiz => {
      byId[quiz.id] = quiz;
    });

    state.byId = byId;

    const nextQuizIds = nextQuizzes.map(quiz => quiz.id);
    state.allIds = nextQuizIds;
  },
  [actionTypes.RECEIVE_QUIZ]: (state, { quiz }) => {
    state.byId[quiz.id] = quiz;

    const found = state.allIds.includes(quiz.id);
    if (!found) {
      state.allIds.push(quiz.id);
    }
  },
  [DELETE_QUIZ_CONFIRMED_SUCCESS]: (state, { quizId }) => {
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
