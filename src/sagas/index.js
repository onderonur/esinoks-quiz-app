import {
  take,
  put,
  call,
  fork,
  all,
  select,
  race,
  cancelled,
  cancel
} from "redux-saga/effects";
import * as actions from "actions";
import firebaseAPI from "firebaseAPI";
import { selectors } from "reducers";
import { normalize } from "normalizr";
import schemas from "schemas";
import { eventChannel } from "redux-saga";

function* navigateSaga(history, path, action = "push") {
  yield call([history, action], path);
}

function* fetchQuizSaga(quizId, history) {
  const { fetchQuiz, navigateTo404 } = actions;
  try {
    yield put(fetchQuiz.requested(quizId));
    const snapshot = yield call(firebaseAPI.getQuiz, quizId);
    if (snapshot.exists) {
      const quiz = yield call(firebaseAPI.getDocFromSnapshot, snapshot);
      const response = normalize(quiz, schemas.quizSchema);
      yield put(fetchQuiz.succeeded(quizId, response));
    } else {
      yield put(navigateTo404(history));
    }
  } catch (error) {
    yield put(fetchQuiz.failed(quizId, error));
  }
}

function* fetchQuizQuestionsSaga(quizId) {
  const { fetchQuizQuestions } = actions;
  try {
    yield put(fetchQuizQuestions.requested(quizId));
    const snapshot = yield call(firebaseAPI.getQuizQuestions, quizId);
    const questions = yield call(
      firebaseAPI.getCollectionFromSnapshot,
      snapshot
    );
    const response = normalize(questions, schemas.questionListSchema);
    yield put(fetchQuizQuestions.succeeded(quizId, response));
  } catch (error) {
    yield put(actions.fetchQuizQuestions.failed(quizId, error));
  }
}

function* fetchAuthUserQuizzesSaga() {
  const { fetchAuthUserQuizzes } = actions;
  try {
    yield put(fetchAuthUserQuizzes.requested());
    const authUser = yield select(selectors.selectAuthUser);
    const { uid: authorId } = authUser;
    const snapshot = yield call(firebaseAPI.getAuthorQuizzes, authorId);
    const quizzes = yield call(firebaseAPI.getCollectionFromSnapshot, snapshot);
    const response = normalize(quizzes, schemas.quizListSchema);
    yield put(fetchAuthUserQuizzes.succeeded(response));
  } catch (error) {
    yield put(fetchAuthUserQuizzes.failed(error));
  }
}

// TODO: Standartize namings
function* createQuizSaga({ title, createdAt, history }) {
  const { createQuiz, navigate } = actions;
  try {
    yield put(createQuiz.requested());
    const authUser = yield select(selectors.selectAuthUser);
    const { uid: authorId } = authUser;
    let quiz = {
      title,
      authorId,
      createdAt
    };
    const docRef = yield call(firebaseAPI.createQuiz, quiz);
    const { id } = docRef;
    quiz = { ...quiz, id };
    const response = normalize(quiz, schemas.quizSchema);
    yield put(createQuiz.succeeded(response));
    // Navigating to the quiz page after successfully creating it.
    // Because that the quiz will be fetched when we navigated to the page,
    // we don't manually add this quiz to store here.
    yield put(navigate(history, `/profile/quiz/${id}`, "replace"));
  } catch (error) {
    yield put(createQuiz.failed(error));
  }
}

function* updateQuizSaga(quizId, { title }) {
  const { updateQuiz } = actions;
  try {
    yield put(updateQuiz.requested());
    const updatedValues = {
      title
    };
    yield call(firebaseAPI.updateQuiz, quizId, updatedValues);
    let quiz = yield select(selectors.selectQuiz, quizId);
    quiz = {
      ...quiz,
      ...updatedValues
    };
    const response = normalize(quiz, schemas.quizSchema);
    yield put(updateQuiz.succeeded(response));
  } catch (error) {
    yield put(updateQuiz.failed(error));
  }
}

function* createQuestionSaga(
  quizId,
  { body, choices, correctAnswer, createdAt }
) {
  const { createQuestion } = actions;
  try {
    yield put(createQuestion.requested());
    let newQuestion = {
      body,
      choices,
      correctAnswer,
      createdAt
    };
    const questionRef = yield call(
      firebaseAPI.createQuestion,
      quizId,
      newQuestion
    );
    const { id } = questionRef;
    newQuestion = {
      ...newQuestion,
      id
    };
    const response = normalize(newQuestion, schemas.questionSchema);
    yield put(createQuestion.succeeded(quizId, response));
  } catch (error) {
    yield put(createQuestion.failed(error));
  }
}

function* updateQuestionSaga(
  quizId,
  questionId,
  { body, choices, correctAnswer }
) {
  const { updateQuestion } = actions;
  try {
    yield put(updateQuestion.requested());
    const updatedValues = {
      body,
      choices,
      correctAnswer
    };
    yield call(firebaseAPI.updateQuestion, quizId, questionId, updatedValues);
    let question = yield select(selectors.selectQuestion, questionId);
    question = {
      ...question,
      ...updatedValues
    };
    const response = normalize(question, schemas.questionSchema);
    yield put(updateQuestion.succeeded(response));
  } catch (error) {
    yield put(updateQuestion.failed(error));
  }
}

function* deleteQuizImagesSaga(quizId) {
  try {
    const storageRef = firebaseAPI.storage.ref();
    const filesRef = storageRef.child(`quiz-images/${quizId}`);
    yield call(filesRef.delete);
  } catch (error) {
    // TODO: ÖNEMLİ: Düzelt
    console.log(error);
  }
}

function* deleteQuizSaga(quizId) {
  const { deleteQuiz } = actions;
  try {
    yield put(deleteQuiz.requested());
    yield call(firebaseAPI.deleteQuiz, quizId);
    yield fork(deleteQuizImagesSaga, quizId);
    yield put(deleteQuiz.succeeded(quizId));
  } catch (error) {
    yield put(deleteQuiz.failed(error));
  }
}

function* deleteQuestionSaga(quizId, questionId) {
  const { deleteQuestion } = actions;
  try {
    yield put(deleteQuestion.requested());
    yield call(firebaseAPI.deleteQuestion, quizId, questionId);
    yield put(deleteQuestion.succeeded(quizId, questionId));
  } catch (error) {
    yield put(deleteQuestion.failed(error));
  }
}

// Inspired from: https://stackoverflow.com/questions/48507262/redux-saga-yield-put-not-working-inside-nested-callback
function* listenAuthStateSaga() {
  const { listenAuthState } = actions;

  const authEventsChannel = eventChannel(emit => {
    const unsubscribe = firebaseAPI.auth.onAuthStateChanged(authUser => {
      emit({ authUser });
    });
    // return a function that can be used to unregister listeners when the saga is cancelled
    return unsubscribe;
  });

  try {
    yield put(listenAuthState.request());
    while (true) {
      const { authUser } = yield take(authEventsChannel);
      yield put(listenAuthState.succeeded(authUser));
    }
  } catch (error) {
    yield put(listenAuthState.failed(error));
  } finally {
    if (yield cancelled()) {
      authEventsChannel.close();
    }
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchNavigate() {
  while (true) {
    const { history, pathname, historyAction } = yield take(actions.NAVIGATE);
    yield fork(navigateSaga, history, pathname, historyAction);
  }
}

function* watchFetchQuiz() {
  while (true) {
    const { quizId, history } = yield take(actions.FETCH_QUIZ._BASE);
    if (quizId !== "new") {
      yield fork(fetchQuizSaga, quizId, history);
    }
  }
}

function* watchFetchQuizQuestions() {
  while (true) {
    const { quizId } = yield take(actions.FETCH_QUIZ_QUESTIONS._BASE);
    yield fork(fetchQuizQuestionsSaga, quizId);
  }
}

function* watchFetchAuthUserQuizzes() {
  while (true) {
    yield take(actions.FETCH_AUTH_USER_QUIZZES._BASE);
    yield fork(fetchAuthUserQuizzesSaga);
  }
}

function* watchCreateQuiz() {
  while (true) {
    const { title, createdAt, history } = yield take(actions.CREATE_QUIZ._BASE);
    yield fork(createQuizSaga, { title, createdAt, history });
  }
}

function* watchUpdateQuiz() {
  while (true) {
    const { quizId, title } = yield take(actions.UPDATE_QUIZ._BASE);
    yield fork(updateQuizSaga, quizId, { title });
  }
}

function* watchCreateQuestion() {
  while (true) {
    const { quizId, body, choices, correctAnswer, createdAt } = yield take(
      actions.CREATE_QUESTION._BASE
    );
    yield fork(createQuestionSaga, quizId, {
      body,
      choices,
      correctAnswer,
      createdAt
    });
  }
}

function* watchUpdateQuestion() {
  while (true) {
    const { quizId, questionId, body, choices, correctAnswer } = yield take(
      actions.UPDATE_QUESTION._BASE
    );
    yield fork(updateQuestionSaga, quizId, questionId, {
      body,
      choices,
      correctAnswer
    });
  }
}

function* watchDeleteQuiz() {
  while (true) {
    const {
      dialogProps: { quizId }
    } = yield take(actions.DELETE_QUIZ._BASE);

    const { confirmed } = yield race({
      confirmed: take(actions.DELETE_QUIZ._CONFIRMED),
      cancelled: take(actions.DELETE_QUIZ._CANCELLED)
    });

    if (confirmed) {
      yield fork(deleteQuizSaga, quizId);
    }
  }
}

function* watchDeleteQuestion() {
  while (true) {
    const {
      dialogProps: { quizId, questionId }
    } = yield take(actions.DELETE_QUESTION._BASE);

    const { confirmed } = yield race({
      confirmed: take(actions.DELETE_QUESTION._CONFIRMED),
      cancelled: take(actions.DELETE_QUESTION._CANCELLED)
    });

    if (confirmed) {
      yield fork(deleteQuestionSaga, quizId, questionId);
    }
  }
}

function* watchListenAuthState() {
  while (true) {
    yield take(actions.LISTEN_AUTH_STATE._BASE);
    const task = yield fork(listenAuthStateSaga);
    yield take(actions.LISTEN_AUTH_STATE._CANCELLED);
    yield cancel(task);
  }
}

export default function* root() {
  yield all([
    fork(watchFetchQuiz),
    fork(watchFetchQuizQuestions),
    fork(watchNavigate),
    fork(watchFetchAuthUserQuizzes),
    fork(watchCreateQuiz),
    fork(watchUpdateQuiz),
    fork(watchCreateQuestion),
    fork(watchUpdateQuestion),
    fork(watchDeleteQuiz),
    fork(watchDeleteQuestion),
    fork(watchListenAuthState)
  ]);
}
