import { take, put, call, fork, cancelled, cancel } from "redux-saga/effects";
import * as actions from "actions";
import firebaseAPI from "firebaseAPI";
import { eventChannel } from "redux-saga";
import SOCIAL_PROVIDERS from "constants/socialProviders";

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
    yield put(listenAuthState.requested());
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

function* socialSignInSaga(provider) {
  try {
    yield put(actions.socialSignIn.requested());
    const socialAuthUser = yield call(SOCIAL_PROVIDERS[provider].handler);
    const { user } = socialAuthUser;
    // Saving user info to application db
    const { uid, displayName, email, photoURL } = user;
    yield put(actions.socialSignIn.succeeded());
    yield call(firebaseAPI.saveUser, uid, { displayName, email, photoURL });
  } catch (error) {
    yield put(actions.socialSignIn.failed(error));
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchListenAuthState() {
  while (true) {
    yield take(actions.listenAuthState);
    const task = yield fork(listenAuthStateSaga);
    yield take(actions.listenAuthState.cancelled);
    yield cancel(task);
  }
}

function* watchSocialSignIn() {
  while (true) {
    // TODO: May create a "sign in flow"
    const { payload } = yield take(actions.socialSignIn);
    const { provider } = payload;
    yield fork(socialSignInSaga, provider);
  }
}

const authSagas = [fork(watchListenAuthState), fork(watchSocialSignIn)];

export default authSagas;
