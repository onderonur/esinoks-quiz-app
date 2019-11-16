import * as actionTypes from "constants/actionTypes";
import { utilTypes, getFirestoreTimeStamp } from "utils";

export const navigate = (history, path, action) => ({
  type: actionTypes.NAVIGATE,
  history,
  path,
  action
});

export const navigateTo404 = history => navigate(history, "/not-found-404");

export const selectQuestion = questionId => ({
  type: actionTypes.SELECT_QUESTION,
  questionId
});

export const unselectQuestion = () => ({
  type: actionTypes.UNSELECT_QUESTION
});

export const answerQuestion = (questionId, choiceIndex) => ({
  type: actionTypes.ANSWER_QUESTION,
  questionId,
  choiceIndex
});

export const restartQuiz = () => ({
  type: actionTypes.RESTART_QUIZ
});

export const restartQuizConfirmed = () => ({
  type: actionTypes.RESTART_QUIZ_CONFIRMED
});

export const restartQuizCancelled = () => ({
  type: actionTypes.RESTART_QUIZ_CANCELLED
});

export const exitedFromQuiz = () => ({
  type: actionTypes.EXITED_FROM_QUIZ
});

export const authStateChanged = authUser => ({
  type: actionTypes.AUTH_STATE_CHANGED,
  authUser
});

export const openQuestionFormDialog = (quizId, questionId) => ({
  type: actionTypes.OPEN_QUESTION_FORM_DIALOG,
  dialogProps: {
    quizId,
    questionId
  }
});

export const closeQuestionFormDialog = () => ({
  type: actionTypes.CLOSE_QUESTION_FORM_DIALOG
});

export const createQuestion = (quizId, { body, choices, correctAnswer }) => ({
  type: actionTypes.CREATE_QUESTION,
  quizId,
  body,
  choices,
  correctAnswer,
  createdAt: getFirestoreTimeStamp(new Date())
});

export const updateQuestion = ({
  quizId,
  questionId,
  body,
  choices,
  correctAnswer
}) => ({
  type: actionTypes.UPDATE_QUESTION,
  quizId,
  questionId,
  body,
  choices,
  correctAnswer
});

export const deleteQuestion = (quizId, questionId) => ({
  type: actionTypes.DELETE_QUESTION,
  dialogProps: {
    quizId,
    questionId
  }
});

export const deleteQuestionConfirmed = (quizId, questionId) => ({
  type: actionTypes.DELETE_QUESTION_CONFIRMED,
  quizId,
  questionId
});

export const deleteQuestionCancelled = () => ({
  type: actionTypes.DELETE_QUESTION_CANCELLED
});

export const createQuiz = ({ title, history }) => ({
  type: actionTypes.CREATE_QUIZ,
  title,
  // TODO: May add this "createdAt" field with cloud functions
  createdAt: getFirestoreTimeStamp(new Date()),
  history
});

export const updateQuiz = ({ quizId, title }) => ({
  type: actionTypes.UPDATE_QUIZ,
  quizId,
  title
});

export const deleteQuiz = quizId => ({
  type: actionTypes.DELETE_QUIZ,
  dialogProps: {
    quizId
  }
});

export const deleteQuizConfirmed = quizId => ({
  type: actionTypes.DELETE_QUIZ_CONFIRMED,
  quizId
});

export const deleteQuizCancelled = () => ({
  type: actionTypes.DELETE_QUIZ_CANCELLED
});

export const shareQuizCode = quizId => ({
  type: actionTypes.SHARE_QUIZ_CODE,
  dialogProps: {
    quizId
  }
});

export const shareQuizCodeCompleted = () => ({
  type: actionTypes.SHARE_QUIZ_CODE_COMPLETED
});

export const listenAuthState = () => ({
  type: actionTypes.LISTEN_AUTH_STATE
});

export const listenAuthStateCancel = () => ({
  type: utilTypes(actionTypes.LISTEN_AUTH_STATE).cancelled
});

export const fetchAuthUserQuizzes = () => ({
  type: actionTypes.FETCH_AUTH_USER_QUIZZES
});

export const fetchQuiz = (quizId, history) => ({
  type: actionTypes.FETCH_QUIZ,
  quizId,
  history
});

export const fetchQuizQuestions = quizId => ({
  type: actionTypes.FETCH_QUIZ_QUESTIONS,
  quizId
});
