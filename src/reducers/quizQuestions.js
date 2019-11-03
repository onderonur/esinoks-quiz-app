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

const selectQuestionIdsByQuizId = (state, quizId) =>
  state.byQuizId[quizId] || [];

export const selectors = {
  selectQuestionIdsByQuizId,
  selectQuestionIndex: (state, quizId, questionId) => {
    const questionIds = selectQuestionIdsByQuizId(state, quizId);
    return questionIds.indexOf(questionId);
  },
  selectTotalQuestionCountByQuizId: (state, quizId) => {
    const questionIds = selectQuestionIdsByQuizId(state, quizId);
    return questionIds.length;
  }
};
