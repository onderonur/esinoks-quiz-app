import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  byId: {},
  allIds: []
};

const ownQuizzes = createReducer(initialState, {
  [actionTypes.RECEIVE_OWN_QUIZZES]: (state, { ownQuizzes }) => {
    const newAllIds = ownQuizzes.map(quiz => quiz.id);

    state.allIds.forEach(id => {
      if (!newAllIds.includes(id)) {
        delete state.byId[id];
      }
    });

    ownQuizzes.forEach(quiz => {
      state.byId[quiz.id] = quiz;
    });

    state.allIds = newAllIds;
  }
});

export default ownQuizzes;

export const selectors = {
  selectOwnQuizIds: state => state.allIds,
  selectOwnQuizById: (state, quizId) => state.byId[quizId]
};
