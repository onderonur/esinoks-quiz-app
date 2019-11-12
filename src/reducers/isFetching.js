import { combineReducers } from "redux";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import * as actionTypes from "constants/actionTypes";
import createByKey from "./higherOrderReducers/createByKey";

const isFetching = combineReducers({
  authState: createIsFetching(actionTypes.LISTEN_AUTH_STATE),
  authUserQuizzes: createIsFetching(actionTypes.FETCH_AUTH_USER_QUIZZES),
  createQuiz: createIsFetching(actionTypes.CREATE_QUIZ),
  updateQuiz: createIsFetching(actionTypes.UPDATE_QUIZ),
  deleteQuiz: createIsFetching(actionTypes.DELETE_QUIZ_CONFIRMED),
  createQuestion: createIsFetching(actionTypes.CREATE_QUESTION),
  updateQuestion: createIsFetching(actionTypes.UPDATE_QUESTION),
  deleteQuestion: createIsFetching(actionTypes.DELETE_QUESTION_CONFIRMED),
  quiz: createByKey(
    action => action.quizId,
    createIsFetching(actionTypes.FETCH_QUIZ)
  ),
  quizQuestions: createByKey(
    action => action.quizId,
    createIsFetching(actionTypes.FETCH_QUIZ_QUESTIONS)
  )
});

export default isFetching;

export const selectors = {
  selectIsFetchingAuthState: state => state.authState,
  selectIsFetchingAuthUserQuizzes: state => state.authUserQuizzes,
  selectIsFetchingCreateQuiz: state => state.createQuiz,
  selectIsFetchingUpdateQuiz: state => state.updateQuiz,
  selectIsFetchingDeleteQuiz: state => state.deleteQuiz,
  selectIsFetchingCreateQuestion: state => state.createQuestion,
  selectIsFetchingUpdateQuestion: state => state.updateQuestion,
  selectIsFetchingDeleteQuestion: state => state.deleteQuestion,
  selectIsFetchingQuiz: (state, quizId) => state.quiz[quizId],
  selectIsFetchingQuizQuestions: (state, quizId) => state.quizQuestions[quizId]
};
