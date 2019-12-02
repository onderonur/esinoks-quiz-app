import { combineReducers } from "redux";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import * as actions from "actions";
import createByKey from "./higherOrderReducers/createByKey";
import get from "lodash.get";

const isFetching = combineReducers({
  authState: createIsFetching(actions.listenAuthState),
  authUserQuizzes: createIsFetching(actions.fetchAuthUserQuizzes),
  createQuiz: createIsFetching(actions.createQuiz),
  updateQuiz: createIsFetching(actions.updateQuiz),
  deleteQuiz: createByKey(
    action => get(action, ["payload", "quizId"]),
    createIsFetching(actions.deleteQuiz)
  ),
  createQuestion: createIsFetching(actions.createQuestion),
  updateQuestion: createIsFetching(actions.updateQuestion),
  deleteQuestion: createByKey(
    action => get(action, ["payload", "questionId"]),
    createIsFetching(actions.deleteQuestion)
  ),
  quiz: createByKey(
    action => get(action, ["payload", "quizId"]),
    createIsFetching(actions.fetchQuiz)
  ),
  quizQuestions: createByKey(
    action => get(action, ["payload", "quizId"]),
    createIsFetching(actions.fetchQuizQuestions)
  ),
  socialSignIn: createIsFetching(actions.socialSignIn)
});

export default isFetching;

export const selectors = {
  selectIsFetchingAuthState: state => state.authState,
  selectIsFetchingAuthUserQuizzes: state => state.authUserQuizzes,
  selectIsFetchingCreateQuiz: state => state.createQuiz,
  selectIsFetchingUpdateQuiz: state => state.updateQuiz,
  selectIsFetchingDeleteQuiz: (state, quizId) => state.deleteQuiz[quizId],
  selectIsFetchingCreateQuestion: state => state.createQuestion,
  selectIsFetchingUpdateQuestion: state => state.updateQuestion,
  selectIsFetchingDeleteQuestion: (state, questionId) =>
    state.deleteQuestion[questionId],
  selectIsFetchingQuiz: (state, quizId) => state.quiz[quizId],
  selectIsFetchingQuizQuestions: (state, quizId) => state.quizQuestions[quizId],
  selectIsFetchingSocialSignIn: state => state.socialSignIn
};
