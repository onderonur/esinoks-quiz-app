import { take, call, fork } from "redux-saga/effects";
import * as actions from "actions";

function* navigateSaga(history, path, action = "push") {
  yield call([history, action], path);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchNavigate() {
  while (true) {
    const { payload } = yield take(actions.navigate);
    const { history, pathname, historyAction } = payload;
    yield fork(navigateSaga, history, pathname, historyAction);
  }
}

const routingSagas = [fork(watchNavigate)];

export default routingSagas;
