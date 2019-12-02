import { createAsyncAction } from "./utils";
import firebaseAPI from "firebaseAPI";
import { createAction } from "@reduxjs/toolkit";

export const selectQuestion = createAction("questions/select", questionId => ({
  payload: {
    questionId
  }
}));

export const answerQuestion = createAction(
  "questions/answer",
  (quizId, questionId, choiceIndex) => ({
    payload: {
      quizId,
      questionId,
      choiceIndex
    }
  })
);

export const openQuestionFormDialog = createAction(
  "questions/openFormDialog",
  (quizId, questionId) => ({
    payload: {
      dialogProps: {
        quizId,
        questionId
      }
    }
  })
);

export const closeQuestionFormDialog = createAction(
  "questions/closeFormDialog"
);

export const createQuestion = createAsyncAction("questions/create", {
  base: (quizId, { body, choices, correctAnswer }) => ({
    payload: {
      quizId,
      input: {
        body,
        choices,
        correctAnswer,
        createdAt: firebaseAPI.getFirestoreTimeStamp(new Date())
      }
    }
  }),
  succeeded: (quizId, response) => ({ payload: { quizId, response } }),
  failed: error => ({ payload: { error } })
});

export const updateQuestion = createAsyncAction("questions/update", {
  base: (quizId, questionId, { body, choices, correctAnswer }) => ({
    payload: { quizId, questionId, input: { body, choices, correctAnswer } }
  }),
  succeeded: response => ({ payload: { response } }),
  failed: error => ({ payload: { error } })
});

export const deleteQuestion = createAsyncAction("questions/delete", {
  base: (quizId, questionId) => ({ payload: { quizId, questionId } }),
  requested: questionId => ({ payload: { questionId } }),
  succeeded: (quizId, questionId) => ({ payload: { quizId, questionId } }),
  failed: (questionId, error) => ({ payload: { questionId, error } })
});

export const fetchQuizQuestions = createAsyncAction("questions/fetchMany", {
  base: quizId => ({ payload: { quizId } }),
  requested: quizId => ({ payload: { quizId } }),
  succeeded: (quizId, response) => ({ payload: { quizId, response } }),
  failed: (quizId, error) => ({ payload: { quizId, error } })
});
