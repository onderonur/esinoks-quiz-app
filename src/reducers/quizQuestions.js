import { removeItemFromArrayMutation } from "utils";
import * as actions from "actions";
import createReducer from "./higherOrderReducers/createReducer";

const initialState = {};

const receiveQuizQuestions = (state, action) => {
  const { quizId, response } = action;
  state[quizId] = response.result;
};

const addQuizQuestion = (state, action) => {
  const { quizId, response } = action;
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const { result: newQuizId } = response;
  quizQuestionIds.push(newQuizId);
};

const removeQuiz = (state, action) => {
  const { quizId } = action;
  delete state[quizId];
};

const removeQuizQuestion = (state, action) => {
  const { quizId, questionId } = action;
  const quizQuestionIds = state[quizId];
  removeItemFromArrayMutation(quizQuestionIds, questionId);
};

// Bu slice'ları ve ilgili selector'lerini ayrı dosyalara al
const quizQuestions = createReducer(initialState, {
  [actions.FETCH_QUIZ_QUESTIONS._SUCCEEDED]: receiveQuizQuestions,
  [actions.CREATE_QUESTION._SUCCEEDED]: addQuizQuestion,
  [actions.DELETE_QUIZ._SUCCEEDED]: removeQuiz,
  [actions.DELETE_QUESTION._SUCCEEDED]: removeQuizQuestion
});

export default quizQuestions;

const selectQuizQuestionIds = (state, quizId) => state[quizId] || [];
const selectTotalQuestionCountByQuizId = (state, quizId) => {
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const { length } = quizQuestionIds;
  return length;
};
const selectQuizQuestionIndex = (state, quizId, questionId) => {
  const quizQuestionIds = selectQuizQuestionIds(state, quizId);
  const quizQuestionIndex = quizQuestionIds.indexOf(questionId);
  return quizQuestionIndex;
};

export const selectors = {
  selectQuizQuestionIds,
  selectTotalQuestionCountByQuizId,
  selectQuizQuestionIndex
};
