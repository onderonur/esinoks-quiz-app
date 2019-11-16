import * as actionTypes from "constants/actionTypes";
import { ofType, combineEpics } from "redux-observable";
import {
  exhaustMap,
  map,
  startWith,
  mapTo,
  catchError,
  tap,
  takeUntil,
  ignoreElements,
  mergeMap
} from "rxjs/operators";
import { from, of, fromEventPattern } from "rxjs";
import firebaseAPI from "firebaseAPI";
import { utilTypes } from "utils";

const mapWithFetchActionTypes = () =>
  map(action => {
    const { type } = action;
    const { requested, succeeded, failed, cancelled } = utilTypes(type);
    return [action, { requested, succeeded, failed, cancelled }];
  });

const deleteQuizConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUIZ_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requested, succeeded, failed }]) => {
      const { quizId } = action;
      return from(firebaseAPI.quiz(quizId).delete()).pipe(
        map(() => ({ type: succeeded, quizId })),
        catchError(error => ({ type: failed, error })),
        startWith({ type: requested })
      );
    })
  );

// When we delete a quiz successfully, we also delete its files too.
// TODO: Düzelt bunu
const deleteQuizImagesEpic = action$ =>
  action$.pipe(
    ofType(utilTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded),
    tap(action => {
      const { quizId } = action;
      const storageRef = firebaseAPI.storage.ref();
      const filesRef = storageRef.child(`quiz-images/${quizId}`);
      // TODO: This gives 404. Fix it.
      from(filesRef.delete());
    }),
    ignoreElements()
  );

const deleteQuestionConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUESTION_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requested, succeeded, failed }]) => {
      const { quizId, questionId } = action;
      return from(firebaseAPI.question(quizId, questionId).delete()).pipe(
        mapTo({ type: succeeded, quizId, questionId }),
        catchError(() => of({ type: failed })),
        startWith({ type: requested })
      );
    })
  );

const listenAuthStateEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.LISTEN_AUTH_STATE),
    mapWithFetchActionTypes(),
    mergeMap(([action, { requested, succeeded, failed, cancelled }]) => {
      // Inspired from: https://stackoverflow.com/questions/50655236/how-to-use-firestore-realtime-updates-onsnapshot-with-redux-observable-rxjs/56503403#56503403
      return fromEventPattern(
        handler => firebaseAPI.auth.onAuthStateChanged(handler),
        (handler, unsubscribe) => unsubscribe()
      ).pipe(
        map(authUser => ({
          type: succeeded,
          authUser
        })),
        catchError(error => of({ type: failed, error })),
        takeUntil(action$.pipe(ofType(cancelled))),
        startWith({ type: requested })
      );
    })
  );

const rootEpic = combineEpics(
  deleteQuizConfirmedEpic,
  deleteQuizImagesEpic,
  deleteQuestionConfirmedEpic,
  listenAuthStateEpic
);

export default rootEpic;
