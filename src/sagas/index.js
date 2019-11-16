import { take, put, call, fork, all, select } from "redux-saga/effects";
import { utilTypes } from "utils";
import * as actionTypes from "constants/actionTypes";
import firebaseAPI from "firebaseAPI";
import { selectors } from "reducers";
import { navigateTo404, navigate } from "actions";
import { normalize } from "normalizr";
import schemas from "schemas";

const fetchQuizTypes = utilTypes(actionTypes.FETCH_QUIZ);
const fetchQuizQuestionsTypes = utilTypes(actionTypes.FETCH_QUIZ_QUESTIONS);
const fetchAuthUserQuizzesTypes = utilTypes(
  actionTypes.FETCH_AUTH_USER_QUIZZES
);
const createQuizTypes = utilTypes(actionTypes.CREATE_QUIZ);
const updateQuizTypes = utilTypes(actionTypes.UPDATE_QUIZ);
const createQuestionTypes = utilTypes(actionTypes.CREATE_QUESTION);
const updateQuestionTypes = utilTypes(actionTypes.UPDATE_QUESTION);

function* navigateSaga(history, path, action = "push") {
  yield call([history, action], path);
}

function* fetchQuizSaga(quizId, history) {
  const { requested, succeeded, failed } = fetchQuizTypes;
  try {
    yield put({ type: requested, quizId });
    const snapshot = yield call(firebaseAPI.getQuiz, quizId);
    if (snapshot.exists) {
      const quiz = yield call(firebaseAPI.getDocFromSnapshot, snapshot);
      const response = normalize(quiz, schemas.quiz);
      yield put({ type: succeeded, response, quizId });
    } else {
      yield put(navigateTo404(history));
    }
  } catch (error) {
    yield put({ type: failed, error, quizId });
  }
}

function* fetchQuizQuestionsSaga(quizId) {
  const { requested, succeeded, failed } = fetchQuizQuestionsTypes;
  try {
    yield put({ type: requested, quizId });
    const snapshot = yield call(firebaseAPI.getQuizQuestions, quizId);
    const questions = yield call(
      firebaseAPI.getCollectionFromSnapshot,
      snapshot
    );
    const response = normalize(questions, [schemas.question]);
    yield put({ type: succeeded, quizId, response });
  } catch (error) {
    yield put({ type: failed, error, quizId });
  }
}

function* fetchAuthUserQuizzesSaga() {
  const { requested, succeeded, failed } = fetchAuthUserQuizzesTypes;
  try {
    yield put({ type: requested });
    const authUser = yield select(selectors.selectAuthUser);
    const { uid: authorId } = authUser;
    const snapshot = yield call(firebaseAPI.getAuthorQuizzes, authorId);
    const quizzes = yield call(firebaseAPI.getCollectionFromSnapshot, snapshot);
    const response = normalize(quizzes, [schemas.quiz]);
    yield put({ type: succeeded, response });
  } catch (error) {
    yield put({ type: failed, error });
  }
}

// TODO: Standartize namings
function* createQuizSaga({ title, createdAt, history }) {
  const { requested, succeeded, failed } = createQuizTypes;
  try {
    yield put({ type: requested });
    const authUser = yield select(selectors.selectAuthUser);
    const { uid: authorId } = authUser;
    const docRef = yield call(firebaseAPI.createQuiz, {
      title,
      authorId,
      createdAt
    });
    const { id: quizId } = docRef;
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
    yield call(firebaseAPI.updateQuiz, quizId, updatedValues);
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

function* createQuestionSaga(
  quizId,
  { body, choices, correctAnswer, createdAt }
) {
  const { requested, succeeded, failed } = createQuestionTypes;
  try {
    yield put({ type: requested });
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
    const response = normalize(newQuestion, schemas.question);
    yield put({ type: succeeded, quizId, response });
  } catch (error) {
    yield put({ type: failed, error });
  }
}

function* updateQuestionSaga(
  quizId,
  questionId,
  { body, choices, correctAnswer }
) {
  const { requested, succeeded, failed } = updateQuestionTypes;
  try {
    yield put({ type: requested });
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
    const response = normalize(question, schemas.question);
    yield put({ type: succeeded, response });
  } catch (error) {
    yield put({ type: failed, error });
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchNavigate() {
  while (true) {
    const { history, path, action } = yield take(actionTypes.NAVIGATE);
    yield fork(navigateSaga, history, path, action);
  }
}

function* watchFetchQuiz() {
  while (true) {
    const { quizId, history } = yield take(actionTypes.FETCH_QUIZ);
    if (quizId !== "new") {
      yield fork(fetchQuizSaga, quizId, history);
    }
  }
}

function* watchFetchQuizQuestions() {
  while (true) {
    const { quizId } = yield take(actionTypes.FETCH_QUIZ_QUESTIONS);
    yield fork(fetchQuizQuestionsSaga, quizId);
  }
}

function* watchFetchAuthUserQuizzes() {
  while (true) {
    yield take(actionTypes.FETCH_AUTH_USER_QUIZZES);
    yield fork(fetchAuthUserQuizzesSaga);
  }
}

function* watchCreateQuiz() {
  while (true) {
    const { title, createdAt, history } = yield take(actionTypes.CREATE_QUIZ);
    yield fork(createQuizSaga, { title, createdAt, history });
  }
}

function* watchUpdateQuiz() {
  while (true) {
    const { quizId, title } = yield take(actionTypes.UPDATE_QUIZ);
    yield fork(updateQuizSaga, quizId, { title });
  }
}

function* watchCreateQuestion() {
  while (true) {
    const { quizId, body, choices, correctAnswer, createdAt } = yield take(
      actionTypes.CREATE_QUESTION
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
      actionTypes.UPDATE_QUESTION
    );
    yield fork(updateQuestionSaga, quizId, questionId, {
      body,
      choices,
      correctAnswer
    });
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
    fork(watchUpdateQuestion)
  ]);
}
