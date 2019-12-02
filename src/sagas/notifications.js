import { put } from "redux-saga/effects";
import * as actions from "actions";
import SNACKBAR_VARIANTS from "constants/notificationVariants";

export function* showErrorMessageSaga(error) {
  const { message } = error || {};
  const { enqueueSnackbar } = actions;
  if (message) {
    yield put(enqueueSnackbar(message, { variant: SNACKBAR_VARIANTS.error }));
  }
}
