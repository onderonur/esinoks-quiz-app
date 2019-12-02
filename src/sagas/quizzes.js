import { take, put, call, fork, select } from "redux-saga/effects";
import * as actions from "actions";
import firebaseAPI from "firebaseAPI";
import { selectors } from "reducers";
import { normalize } from "normalizr";
import schemas from "schemas";
import SNACKBAR_VARIANTS from "constants/notificationVariants";
import { showErrorMessageSaga } from "sagas/notifications";

function* fetchQuizSaga(quizId, history) {
  const { fetchQuiz, navigateTo404 } = actions;
  try {
    yield put(fetchQuiz.requested(quizId));
    const response = yield call(firebaseAPI.getQuiz, quizId);
    if (response) {
      yield put(fetchQuiz.succeeded(quizId, response));
    } else {
      yield put(navigateTo404(history));
    }
  } catch (error) {
    yield put(fetchQuiz.failed(quizId, error));
  }
}

function* fetchAuthUserQuizzesSaga() {
  const { fetchAuthUserQuizzes } = actions;
  try {
    yield put(fetchAuthUserQuizzes.requested());
    const authUser = yield select(selectors.selectAuthUser);
    const { uid: authorId } = authUser;
    const response = yield call(firebaseAPI.getAuthorQuizzes, authorId);
    yield put(fetchAuthUserQuizzes.succeeded(response));
  } catch (error) {
    yield put(fetchAuthUserQuizzes.failed(error));
  }
}

function* createQuizSaga(input, history) {
  const { createQuiz, navigate, enqueueSnackbar } = actions;
  try {
    yield put(createQuiz.requested());
    const authUser = yield select(selectors.selectAuthUser);
    const { uid: authorId } = authUser;
    const response = yield call(firebaseAPI.createQuiz, {
      authorId,
      ...input
    });
    yield put(createQuiz.succeeded(response));
    yield put(
      enqueueSnackbar("Quiz başarıyla oluşturuldu.", {
        variant: SNACKBAR_VARIANTS.success
      })
    );
    // Navigating to the quiz page after successfully creating it.
    // Because that the quiz will be fetched when we navigated to the page,
    // we don't manually add this quiz to store here.
    const quizId = response.result;
    yield put(navigate(history, `/profile/quiz/${quizId}`, "replace"));
  } catch (error) {
    yield put(createQuiz.failed(error));
    yield call(showErrorMessageSaga, error);
  }
}

function* updateQuizSaga(quizId, input) {
  const { updateQuiz, enqueueSnackbar } = actions;
  try {
    yield put(updateQuiz.requested());
    yield call(firebaseAPI.updateQuiz, quizId, input);
    let quiz = yield select(selectors.selectQuiz, quizId);
    quiz = {
      ...quiz,
      ...input
    };
    const response = yield call(normalize, quiz, schemas.quizSchema);
    yield put(updateQuiz.succeeded(response));
    yield put(
      enqueueSnackbar("Quiz başarıyla güncellendi.", {
        variant: SNACKBAR_VARIANTS.success
      })
    );
  } catch (error) {
    yield put(updateQuiz.failed(error));
    yield call(showErrorMessageSaga, error);
  }
}

function* deleteQuizImagesSaga(quizId) {
  try {
    const ref = yield call(firebaseAPI.quizImagePaths, quizId);
    const snapshot = yield ref.get();
    const { docs } = snapshot;

    // Deleting all images those are owned by the deleted quiz
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      const data = doc.data();
      const { filepath } = data;
      const fileRef = firebaseAPI.storage.ref(filepath);
      yield call([fileRef, "delete"]);
      yield call([doc.ref, "delete"]);
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteQuizSaga(quizId) {
  const { deleteQuiz, enqueueSnackbar } = actions;
  try {
    yield put(deleteQuiz.requested(quizId));
    // We are validating the removal of the images by using quiz.authorId and uid of the
    // current signed in user (with firestore rules).
    // If we delete the quiz before we delete the images and image paths,
    // the rule simply denies the access.
    // So we delete images first.
    yield call(deleteQuizImagesSaga, quizId);
    // https://firebase.google.com/docs/firestore/manage-data/delete-data
    // Warning: Deleting a document does not delete its subcollections!
    yield call(firebaseAPI.deleteQuiz, quizId);
    yield put(deleteQuiz.succeeded(quizId));
    yield put(
      enqueueSnackbar("Quiz başarıyla silindi.", {
        variant: SNACKBAR_VARIANTS.success
      })
    );
  } catch (error) {
    yield put(deleteQuiz.failed(quizId, error));
    yield call(showErrorMessageSaga, error);
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchQuiz() {
  while (true) {
    const { payload } = yield take(actions.fetchQuiz);
    const { quizId, history } = payload;
    if (quizId !== "new") {
      yield fork(fetchQuizSaga, quizId, history);
    }
  }
}

function* watchFetchAuthUserQuizzes() {
  while (true) {
    yield take(actions.fetchAuthUserQuizzes);
    yield fork(fetchAuthUserQuizzesSaga);
  }
}

function* watchCreateQuiz() {
  while (true) {
    const { payload } = yield take(actions.createQuiz);
    const { input, history } = payload;
    yield fork(createQuizSaga, input, history);
  }
}

function* watchUpdateQuiz() {
  while (true) {
    const { payload } = yield take(actions.updateQuiz);
    const { quizId, input } = payload;
    yield fork(updateQuizSaga, quizId, input);
  }
}

function* watchDeleteQuiz() {
  while (true) {
    const { payload } = yield take(actions.deleteQuiz);
    const { quizId } = payload;
    yield fork(deleteQuizSaga, quizId);
  }
}

const quizzesSagas = [
  fork(watchFetchQuiz),
  fork(watchFetchAuthUserQuizzes),
  fork(watchCreateQuiz),
  fork(watchUpdateQuiz),
  fork(watchDeleteQuiz)
];

export default quizzesSagas;
