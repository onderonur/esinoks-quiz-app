import { combineReducers } from "redux";
import * as actions from "actions";
import createByKey from "./higherOrderReducers/createByKey";
import get from "lodash.get";
import createAsyncInfo, * as fromCreateAsyncInfo from "./higherOrderReducers/createAsyncInfo";

const asyncInfo = combineReducers({
  authState: createAsyncInfo(actions.listenAuthState),
  authUserQuizzes: createAsyncInfo(actions.fetchAuthUserQuizzes),
  createQuiz: createAsyncInfo(actions.createQuiz),
  updateQuiz: createAsyncInfo(actions.updateQuiz),
  deleteQuiz: createByKey(
    action => get(action, ["payload", "quizId"]),
    createAsyncInfo(actions.deleteQuiz)
  ),
  createQuestion: createAsyncInfo(actions.createQuestion),
  updateQuestion: createAsyncInfo(actions.updateQuestion),
  deleteQuestion: createByKey(
    action => get(action, ["payload", "questionId"]),
    createAsyncInfo(actions.deleteQuestion)
  ),
  quiz: createByKey(
    action => get(action, ["payload", "quizId"]),
    createAsyncInfo(actions.fetchQuiz)
  ),
  quizQuestions: createByKey(
    action => get(action, ["payload", "quizId"]),
    createAsyncInfo(actions.fetchQuizQuestions)
  ),
  socialSignIn: createAsyncInfo(actions.socialSignIn)
});

export default asyncInfo;

const { selectAsyncInfo } = fromCreateAsyncInfo.selectors;

export const selectors = {
  selectAsyncInfoAuthState: state => selectAsyncInfo(state.authState),
  selectAsyncInfoAuthUserQuizzes: state =>
    selectAsyncInfo(state.authUserQuizzes),
  selectAsyncInfoCreateQuiz: state => selectAsyncInfo(state.createQuiz),
  selectAsyncInfoUpdateQuiz: state => selectAsyncInfo(state.updateQuiz),
  selectAsyncInfoDeleteQuiz: (state, quizId) =>
    selectAsyncInfo(state.deleteQuiz[quizId]),
  selectAsyncInfoCreateQuestion: state => selectAsyncInfo(state.createQuestion),
  selectAsyncInfoUpdateQuestion: state => selectAsyncInfo(state.updateQuestion),
  selectAsyncInfoDeleteQuestion: (state, questionId) =>
    selectAsyncInfo(state.deleteQuestion[questionId]),
  selectAsyncInfoQuiz: (state, quizId) => selectAsyncInfo(state.quiz[quizId]),
  selectAsyncInfoQuizQuestions: (state, quizId) =>
    selectAsyncInfo(state.quizQuestions[quizId]),
  selectAsyncInfoSocialSignIn: state => selectAsyncInfo(state.socialSignIn)
};
