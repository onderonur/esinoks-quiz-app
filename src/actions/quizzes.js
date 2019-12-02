import { createAsyncAction } from "./utils";
import firebaseAPI from "firebaseAPI";
import { createAction } from "@reduxjs/toolkit";

export const restartQuiz = createAction("quizzes/restart", quizId => ({
  payload: {
    quizId
  }
}));

export const exitFromQuiz = createAction("quizzes/exit", quizId => ({
  payload: {
    quizId
  }
}));

export const createQuiz = createAsyncAction("quizzes/create", {
  base: ({ title, history }) => ({
    payload: {
      history,
      input: {
        title,
        createdAt: firebaseAPI.getFirestoreTimeStamp(new Date())
      }
    }
  }),
  succeeded: response => ({ payload: { response } }),
  failed: error => ({ payload: { error } })
});

export const updateQuiz = createAsyncAction("quizzes/update", {
  base: (quizId, { title }) => ({ payload: { quizId, input: { title } } }),
  succeeded: response => ({ payload: { response } }),
  failed: error => ({ payload: { error } })
});

export const deleteQuiz = createAsyncAction("quizzes/delete", {
  base: quizId => ({ payload: { quizId } }),
  requested: quizId => ({ payload: { quizId } }),
  succeeded: quizId => ({ payload: { quizId } }),
  failed: (quizId, error) => ({ payload: { quizId, error } })
});

export const fetchAuthUserQuizzes = createAsyncAction(
  "quizzes/fetchAuthUserQuizzes",
  {
    succeeded: response => ({ payload: { response } }),
    failed: error => ({ payload: { error } })
  }
);

export const fetchQuiz = createAsyncAction("quizzes/fetch", {
  base: (quizId, history) => ({ payload: { quizId, history } }),
  requested: quizId => ({ payload: { quizId } }),
  succeeded: (quizId, response) => ({ payload: { quizId, response } }),
  failed: (quizId, error) => ({ payload: { quizId, error } })
});
