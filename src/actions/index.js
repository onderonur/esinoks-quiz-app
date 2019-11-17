import { getFirestoreTimeStamp } from "utils";

// TODO: This name causes a lot of conflicts. May change it.
export const action = (type, payload = {}) => ({ type, ...payload });

export const _REQUESTED = "_REQUESTED";
export const _SUCCEEDED = "_SUCCEEDED";
export const _FAILED = "_FAILED";
export const _CANCELLED = "_CANCELLED";
const _CONFIRMED = "_CONFIRMED";

const utilTypes = baseType => {
  const getType = suffix => `${baseType}${suffix}`;

  return {
    _BASE: baseType,
    [_REQUESTED]: getType(_REQUESTED),
    [_SUCCEEDED]: getType(_SUCCEEDED),
    [_FAILED]: getType(_FAILED),
    [_CANCELLED]: getType(_CANCELLED),
    [_CONFIRMED]: getType(_CONFIRMED)
  };
};

export const NAVIGATE = "NAVIGATE";
export const navigate = (history, pathname, historyAction) =>
  action(NAVIGATE, { history, pathname, historyAction });

export const navigateTo404 = history => navigate(history, "/not-found-404");

export const SELECT_QUESTION = "SELECT_QUESTION";
export const selectQuestion = questionId =>
  action(SELECT_QUESTION, { questionId });

export const UNSELECT_QUESTION = "UNSELECT_QUESTION";
export const unselectQuestion = () => action(UNSELECT_QUESTION);

export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const answerQuestion = (questionId, choiceIndex) =>
  action(ANSWER_QUESTION, { questionId, choiceIndex });

export const RESTART_QUIZ = utilTypes("RESTART_QUIZ");
export const restartQuiz = {
  base: () => action(RESTART_QUIZ._BASE),
  confirmed: () => action(RESTART_QUIZ._CONFIRMED),
  cancelled: () => action(RESTART_QUIZ._CANCELLED)
};

export const EXITED_FROM_QUIZ = "EXITED_FROM_QUIZ";
export const exitedFromQuiz = () => action(EXITED_FROM_QUIZ);

export const AUTH_STATE_CHANGED = "AUTH_STATE_CHANGED";
export const authStateChanged = authUser =>
  action(AUTH_STATE_CHANGED, { authUser });

export const OPEN_QUESTION_FORM_DIALOG = "OPEN_QUESTION_FORM_DIALOG";
export const openQuestionFormDialog = (quizId, questionId) =>
  action(OPEN_QUESTION_FORM_DIALOG, { dialogProps: { quizId, questionId } });

export const CLOSE_QUESTION_FORM_DIALOG = "CLOSE_QUESTION_FORM_DIALOG";
export const closeQuestionFormDialog = () => action(CLOSE_QUESTION_FORM_DIALOG);

export const CREATE_QUESTION = utilTypes("CREATE_QUESTION");
export const createQuestion = {
  base: (quizId, { body, choices, correctAnswer }) =>
    action(CREATE_QUESTION._BASE, {
      quizId,
      body,
      choices,
      correctAnswer,
      createdAt: getFirestoreTimeStamp(new Date())
    }),
  requested: () => action(CREATE_QUESTION._REQUESTED),
  succeeded: (quizId, response) =>
    action(CREATE_QUESTION._SUCCEEDED, { quizId, response }),
  failed: error => action(CREATE_QUESTION._FAILED, { error })
};

export const UPDATE_QUESTION = utilTypes("UPDATE_QUESTION");
export const updateQuestion = {
  base: (quizId, questionId, updatedValues) =>
    action(UPDATE_QUESTION._BASE, { quizId, questionId, ...updatedValues }),
  requested: () => action(UPDATE_QUESTION._REQUESTED),
  succeeded: response => action(UPDATE_QUESTION._SUCCEEDED, { response }),
  failed: error => action(UPDATE_QUESTION._FAILED, { error })
};

export const DELETE_QUESTION = utilTypes("DELETE_QUESTION");
export const deleteQuestion = {
  base: (quizId, questionId) =>
    action(DELETE_QUESTION._BASE, { dialogProps: { quizId, questionId } }),
  requested: () => action(DELETE_QUESTION._REQUESTED),
  succeeded: (quizId, questionId) =>
    action(DELETE_QUESTION._SUCCEEDED, { quizId, questionId }),
  failed: error => action(DELETE_QUESTION._FAILED, error),
  confirmed: () => action(DELETE_QUESTION._CONFIRMED),
  cancelled: () => action(DELETE_QUESTION._CANCELLED)
};

export const CREATE_QUIZ = utilTypes("CREATE_QUIZ");
export const createQuiz = {
  base: ({ title, history }) =>
    action(CREATE_QUIZ._BASE, {
      title,
      // TODO: May add this "createdAt" field with cloud functions
      createdAt: getFirestoreTimeStamp(new Date()),
      history
    }),
  requested: () => action(CREATE_QUIZ._REQUESTED),
  succeeded: response => action(CREATE_QUIZ._SUCCEEDED, { response }),
  failed: error => action(CREATE_QUIZ._FAILED, { error })
};

export const UPDATE_QUIZ = utilTypes("UPDATE_QUIZ");
export const updateQuiz = {
  base: (quizId, updatedValues) =>
    action(UPDATE_QUIZ._BASE, { quizId, ...updatedValues }),
  requested: () => action(UPDATE_QUIZ._REQUESTED),
  succeeded: response => action(UPDATE_QUIZ._SUCCEEDED, { response }),
  failed: error => action(UPDATE_QUIZ._FAILED, { error })
};

export const DELETE_QUIZ = utilTypes("DELETE_QUIZ");
export const deleteQuiz = {
  base: quizId => action(DELETE_QUIZ._BASE, { dialogProps: { quizId } }),
  requested: () => action(DELETE_QUIZ._REQUESTED),
  succeeded: quizId => action(DELETE_QUIZ._SUCCEEDED, { quizId }),
  confirmed: () => action(DELETE_QUIZ._CONFIRMED),
  cancelled: () => action(DELETE_QUIZ._CANCELLED),
  failed: error => action(DELETE_QUIZ._FAILED, { error })
};

export const SHARE_QUIZ_CODE = utilTypes("SHARE_QUIZ_CODE");
export const shareQuizCode = {
  base: quizId => action(SHARE_QUIZ_CODE._BASE, { dialogProps: { quizId } }),
  succeeded: () => action(SHARE_QUIZ_CODE._SUCCEEDED)
};

export const LISTEN_AUTH_STATE = utilTypes("LISTEN_AUTH_STATE");
export const listenAuthState = {
  base: () => action(LISTEN_AUTH_STATE._BASE),
  request: () => action(LISTEN_AUTH_STATE._REQUESTED),
  succeeded: authUser => action(LISTEN_AUTH_STATE._SUCCEEDED, { authUser }),
  failed: error => action(LISTEN_AUTH_STATE._FAILED, { error }),
  cancelled: () => action(LISTEN_AUTH_STATE._CANCELLED)
};

export const FETCH_AUTH_USER_QUIZZES = utilTypes("FETCH_AUTH_USER_QUIZZES");
export const fetchAuthUserQuizzes = {
  base: () => action(FETCH_AUTH_USER_QUIZZES._BASE),
  requested: () => action(FETCH_AUTH_USER_QUIZZES._REQUESTED),
  succeeded: response =>
    action(FETCH_AUTH_USER_QUIZZES._SUCCEEDED, { response }),
  failed: error => action(FETCH_AUTH_USER_QUIZZES._FAILED, { error })
};

export const FETCH_QUIZ = utilTypes("FETCH_QUIZ");
export const fetchQuiz = {
  base: quizId => action(FETCH_QUIZ._BASE, { quizId }),
  requested: quizId => action(FETCH_QUIZ._REQUESTED, { quizId }),
  succeeded: (quizId, response) =>
    action(FETCH_QUIZ._SUCCEEDED, { quizId, response }),
  failed: (quizId, error) => action(FETCH_QUIZ._FAILED, { quizId, error })
};

export const FETCH_QUIZ_QUESTIONS = utilTypes("FETCH_QUIZ_QUESTIONS");
export const fetchQuizQuestions = {
  base: quizId => action(FETCH_QUIZ_QUESTIONS._BASE, { quizId }),
  requested: quizId => action(FETCH_QUIZ_QUESTIONS._REQUESTED, { quizId }),
  succeeded: (quizId, response) =>
    action(FETCH_QUIZ_QUESTIONS._SUCCEEDED, { quizId, response }),
  failed: (quizId, error) => action(FETCH_QUIZ_QUESTIONS, { quizId, error })
};
