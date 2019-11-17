import { combineReducers } from "redux";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import * as actions from "actions";
import createByKey from "./higherOrderReducers/createByKey";

const isFetching = combineReducers({
  authState: createIsFetching(actions.LISTEN_AUTH_STATE),
  authUserQuizzes: createIsFetching(actions.FETCH_AUTH_USER_QUIZZES),
  createQuiz: createIsFetching(actions.CREATE_QUIZ),
  updateQuiz: createIsFetching(actions.UPDATE_QUIZ),
  deleteQuiz: createIsFetching(actions.DELETE_QUIZ),
  createQuestion: createIsFetching(actions.CREATE_QUESTION),
  updateQuestion: createIsFetching(actions.UPDATE_QUESTION),
  deleteQuestion: createIsFetching(actions.DELETE_QUESTION),
  quiz: createByKey(
    action => action.quizId,
    createIsFetching(actions.FETCH_QUIZ)
  ),
  quizQuestions: createByKey(
    action => action.quizId,
    createIsFetching(actions.FETCH_QUIZ_QUESTIONS)
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
