import { take, put, call, fork, select } from "redux-saga/effects";
import * as actions from "actions";
import firebaseAPI from "firebaseAPI";
import { selectors } from "reducers";
import { normalize } from "normalizr";
import schemas from "schemas";
import SNACKBAR_VARIANTS from "constants/notificationVariants";
import { showErrorMessageSaga } from "sagas/notifications";

function* fetchQuizQuestionsSaga(quizId) {
  const { fetchQuizQuestions } = actions;
  try {
    yield put(fetchQuizQuestions.requested(quizId));
    const response = yield call(firebaseAPI.getQuizQuestions, quizId);
    yield put(fetchQuizQuestions.succeeded(quizId, response));
  } catch (error) {
    yield put(fetchQuizQuestions.failed(quizId, error));
  }
}

function* createQuestionSaga(quizId, input) {
  const { createQuestion, enqueueSnackbar } = actions;
  try {
    yield put(createQuestion.requested());
    const response = yield call(firebaseAPI.createQuestion, quizId, input);
    yield put(createQuestion.succeeded(quizId, response));
    yield put(
      enqueueSnackbar("Soru başarıyla oluşturuldu.", {
        variant: SNACKBAR_VARIANTS.success
      })
    );
  } catch (error) {
    yield put(createQuestion.failed(error));
    yield call(showErrorMessageSaga, error);
  }
}

function* updateQuestionSaga(
  quizId,
  questionId,
  { body, choices, correctAnswer }
) {
  const { updateQuestion, enqueueSnackbar } = actions;
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
    const response = yield call(normalize, question, schemas.questionSchema);
    yield put(updateQuestion.succeeded(response));
    yield put(
      enqueueSnackbar("Soru başarıyla güncellendi.", {
        variant: SNACKBAR_VARIANTS.success
      })
    );
  } catch (error) {
    yield put(updateQuestion.failed(error));
    yield call(showErrorMessageSaga, error);
  }
}

function* deleteQuestionSaga(quizId, questionId) {
  const { deleteQuestion, enqueueSnackbar } = actions;
  try {
    yield put(deleteQuestion.requested(questionId));
    yield call(firebaseAPI.deleteQuestion, quizId, questionId);
    yield put(deleteQuestion.succeeded(quizId, questionId));
    yield put(
      enqueueSnackbar("Soru başarıyla silindi.", {
        variant: SNACKBAR_VARIANTS.success
      })
    );
  } catch (error) {
    yield put(deleteQuestion.failed(questionId, error));
    yield call(showErrorMessageSaga, error);
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchQuizQuestions() {
  while (true) {
    const { payload } = yield take(actions.fetchQuizQuestions);
    const { quizId } = payload;
    yield fork(fetchQuizQuestionsSaga, quizId);
  }
}

function* watchCreateQuestion() {
  while (true) {
    const { payload } = yield take(actions.createQuestion);
    const { quizId, input } = payload;
    yield fork(createQuestionSaga, quizId, input);
  }
}

function* watchUpdateQuestion() {
  while (true) {
    const { payload } = yield take(actions.updateQuestion);
    const { quizId, questionId, input } = payload;
    yield fork(updateQuestionSaga, quizId, questionId, input);
  }
}

function* watchDeleteQuestion() {
  while (true) {
    const { payload } = yield take(actions.deleteQuestion);
    const { quizId, questionId } = payload;
    yield fork(deleteQuestionSaga, quizId, questionId);
  }
}

const questionsSagas = [
  fork(watchFetchQuizQuestions),
  fork(watchCreateQuestion),
  fork(watchUpdateQuestion),
  fork(watchDeleteQuestion)
];

export default questionsSagas;
