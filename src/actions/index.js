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
