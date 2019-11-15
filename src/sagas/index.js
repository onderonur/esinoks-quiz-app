import { take, put, call, fork, all, select } from "redux-saga/effects";
import { getFetchTypes } from "utils";
import * as actionTypes from "constants/actionTypes";
import firebase from "app-firebase";
import { selectors } from "reducers";
import { navigateTo404, navigate } from "actions";
import { normalize } from "normalizr";
import schemas from "schemas";

const fetchQuizTypes = getFetchTypes(actionTypes.FETCH_QUIZ);
const fetchQuizQuestionsTypes = getFetchTypes(actionTypes.FETCH_QUIZ_QUESTIONS);
const fetchAuthUserQuizzesTypes = getFetchTypes(
  actionTypes.FETCH_AUTH_USER_QUIZZES
);
const createQuizTypes = getFetchTypes(actionTypes.CREATE_QUIZ);
const updateQuizTypes = getFetchTypes(actionTypes.UPDATE_QUIZ);

const getQuiz = quizId => firebase.quiz(quizId).get();
const getQuizQuestions = quizId =>
  firebase
    .questions(quizId)
    .orderBy("createdAt")
    .get();
const getAuthUserQuizzes = authorId =>
  firebase
    .quizzes()
    .where("authorId", "==", authorId)
    .orderBy("createdAt")
    .get();
const createQuiz = ({ title, authorId, createdAt }) =>
  firebase.quizzes().add({ title, authorId, createdAt });
const updateQuiz = (quizId, { title }) =>
  firebase.quiz(quizId).update({ title });

const getDocFromSnapshot = snapshot => {
  const data = {
    id: snapshot.id,
    ...snapshot.data()
  };
  return data;
};

const getCollectionFromSnapshot = snapshot => {
  const { docs } = snapshot;
  const collection = docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return collection;
};

function* navigateTo(history, path, action = "push") {
  yield call([history, action], path);
}

function* fetchQuiz(quizId, history) {
  try {
    yield put({ type: fetchQuizTypes.requested, quizId });
    const snapshot = yield call(getQuiz, quizId);
    if (snapshot.exists) {
      const quiz = getDocFromSnapshot(snapshot);
      const response = normalize(quiz, schemas.quiz);
      yield put({ type: fetchQuizTypes.succeeded, response, quizId });
    } else {
      yield put(navigateTo404(history));
    }
  } catch (error) {
    yield put({ type: fetchQuizTypes.failed, error });
  }
}

function* fetchQuizQuestions(quizId) {
  const { requested, succeeded, failed } = fetchQuizQuestionsTypes;
  try {
    yield put({ type: requested, quizId });
    const snapshot = yield call(getQuizQuestions, quizId);
    const questions = getCollectionFromSnapshot(snapshot);
    const response = normalize(questions, [schemas.question]);
    yield put({ type: succeeded, quizId, response });
  } catch (error) {
    yield put({ type: failed, quizId, error });
  }
}

function* fetchAuthUserQuizzes() {
  const { requested, succeeded, failed } = fetchAuthUserQuizzesTypes;
  try {
    yield put({ type: requested });
    const authUser = yield select(selectors.selectAuthUser);
    const authUserId = authUser.uid;
    const snapshot = yield call(getAuthUserQuizzes, authUserId);
    const quizzes = getCollectionFromSnapshot(snapshot);
    const response = normalize(quizzes, [schemas.quiz]);
    yield put({ type: succeeded, response });
  } catch (error) {
    yield put({ type: failed, error });
  }
}

// TODO: Standartize namings
function* createQuizSaga({ title, authorId, createdAt, history }) {
  const { requested, succeeded, failed } = createQuizTypes;
  try {
    yield put({ type: requested });
    const docRef = yield call(createQuiz, { title, authorId, createdAt });
    const quizId = docRef.id;
    yield put({ type: succeeded, quizId });
    // Navigating to the quiz page after successfully creating it.
    // Because that the quiz will be fetched when we navigated to the page,
    // we don't manually add this quiz to store here.
    yield put(navigate(history, `/profile/quiz/${quizId}`, "replace"));
  } catch (error) {
    yield put({ type: failed, error });
  }
}

function* updateQuizSaga(quizId, { title }) {
  const { requested, succeeded, failed } = updateQuizTypes;
  try {
    yield put({ type: requested });
    const updatedValues = {
      title
    };
    yield call(updateQuiz, quizId, updatedValues);
    let quiz = yield select(selectors.selectQuiz, quizId);
    quiz = {
      ...quiz,
      ...updatedValues
    };
    const response = normalize(quiz, schemas.quiz);
    yield put({ type: succeeded, response });
  } catch (error) {
    yield put({ type: failed, error });
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchNavigateTo() {
  while (true) {
    const { history, path, action } = yield take(actionTypes.NAVIGATE);
    yield fork(navigateTo, history, path, action);
  }
}

function* watchFetchQuiz() {
  while (true) {
    const { quizId, history } = yield take(actionTypes.FETCH_QUIZ);
    if (quizId !== "new") {
      yield fork(fetchQuiz, quizId, history);
    }
  }
}

function* watchFetchQuizQuestions() {
  while (true) {
    const { quizId } = yield take(actionTypes.FETCH_QUIZ_QUESTIONS);
    yield fork(fetchQuizQuestions, quizId);
  }
}

function* watchFetchAuthUserQuizzes() {
  while (true) {
    yield take(actionTypes.FETCH_AUTH_USER_QUIZZES);
    yield fork(fetchAuthUserQuizzes);
  }
}

function* watchCreateQuiz() {
  while (true) {
    const { title, authorId, createdAt, history } = yield take(
      actionTypes.CREATE_QUIZ
    );
    yield fork(createQuizSaga, { title, authorId, createdAt, history });
  }
}

function* watchUpdateQuiz() {
  while (true) {
    const { quizId, title } = yield take(actionTypes.UPDATE_QUIZ);
    yield fork(updateQuizSaga, quizId, { title });
  }
}

export default function* root() {
  yield all([
    fork(watchFetchQuiz),
    fork(watchFetchQuizQuestions),
    fork(watchNavigateTo),
    fork(watchFetchAuthUserQuizzes),
    fork(watchCreateQuiz),
    fork(watchUpdateQuiz)
  ]);
}
