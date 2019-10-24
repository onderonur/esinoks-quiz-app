import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  byQuizId: {}
};

const quizQuestions = createReducer(initialState, {
  [actionTypes.RECEIVE_QUIZ_QUESTIONS]: (state, { quizId, questions }) => {
    const questionIds = questions ? questions.map(question => question.id) : [];
    state.byQuizId[quizId] = questionIds;
  }
});

export default quizQuestions;

export const selectors = {
  selectQuestionIdsByQuizId: (state, quizId) => state.byQuizId[quizId] || []
};
