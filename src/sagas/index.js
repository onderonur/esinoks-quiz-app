import { all } from "redux-saga/effects";
import authSagas from "sagas/auth";
import questionsSagas from "sagas/questions";
import quizzesSagas from "sagas/quizzes";
import routingSagas from "sagas/routing";

export default function* root() {
  yield all([
    ...authSagas,
    ...questionsSagas,
    ...quizzesSagas,
    ...routingSagas
  ]);
}
