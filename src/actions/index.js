import * as actionTypes from "constants/actionTypes";
export const startQuiz = () => ({
  type: actionTypes.START_QUIZ
});

export const toggleFullscreen = isFullscreen => ({
  type: actionTypes.TOGGLE_FULLSCREEN,
  isFullscreen
});

export const selectQuestion = questionId => ({
  type: actionTypes.SELECT_QUESTION,
  questionId
});

export const selectChoice = (questionId, choiceId) => ({
  type: actionTypes.SELECT_CHOICE,
  questionId,
  choiceId
});

export const answerQuestion = (questionId, choiceId) => ({
  type: actionTypes.ANSWER_QUESTION,
  questionId,
  choiceId
});

export const restartQuiz = () => ({
  type: actionTypes.RESTART_QUIZ
});

export const authStateChanged = authUser => ({
  type: actionTypes.AUTH_STATE_CHANGED,
  authUser
});

export const openQuizFormDialog = quizId => ({
  type: actionTypes.OPEN_QUIZ_FORM_DIALOG,
  quizId
});

export const closeQuizFormDialog = () => ({
  type: actionTypes.CLOSE_QUIZ_FORM_DIALOG
});

export const receiveOwnQuizzes = ownQuizzes => ({
  type: actionTypes.RECEIVE_OWN_QUIZZES,
  ownQuizzes
});
