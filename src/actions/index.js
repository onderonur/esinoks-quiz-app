import * as actionTypes from "constants/actionTypes";

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

export const restartQuizConfirmed = () => ({
  type: actionTypes.RESTART_QUIZ_CONFIRMED
});

export const restartQuizCancelled = () => ({
  type: actionTypes.RESTART_QUIZ_CANCELLED
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

export const createQuestion = ({ quizId, text, choices }) => ({
  type: actionTypes.CREATE_QUESTION,
  quizId,
  text,
  choices
});

export const updateQuestion = ({ quizId, questionId, text, choices }) => ({
  type: actionTypes.UPDATE_QUESTION,
  quizId,
  questionId,
  text,
  choices
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

export const receiveQuizzes = quizzes => ({
  type: actionTypes.RECEIVE_QUIZZES,
  quizzes
});

export const receiveQuiz = quizDoc => {
  const quiz = {
    id: quizDoc.id,
    ...quizDoc.data()
  };

  return {
    type: actionTypes.RECEIVE_QUIZ,
    quiz
  };
};

export const createQuiz = ({ title, authorId, history }) => ({
  type: actionTypes.CREATE_QUIZ,
  title,
  authorId,
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

export const receiveQuizQuestions = (quizId, questions) => ({
  type: actionTypes.RECEIVE_QUIZ_QUESTIONS,
  quizId,
  questions
});
