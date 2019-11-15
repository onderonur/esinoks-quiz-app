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
import firebase from "app-firebase";
import { getFetchTypes } from "utils";
import { selectors } from "reducers";
import { normalize } from "normalizr";
import schemas from "schemas";

const mapWithFetchActionTypes = () =>
  map(action => {
    const { type } = action;
    const { requested, succeeded, failed, cancelled } = getFetchTypes(type);
    return [action, { requested, succeeded, failed, cancelled }];
  });

const deleteQuizConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUIZ_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requested, succeeded, failed }]) => {
      const { quizId } = action;
      return from(firebase.quiz(quizId).delete()).pipe(
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
    ofType(getFetchTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded),
    tap(action => {
      const { quizId } = action;
      const storageRef = firebase.storage.ref();
      const filesRef = storageRef.child(`quiz-images/${quizId}`);
      // TODO: This gives 404. Fix it.
      from(filesRef.delete());
    }),
    ignoreElements()
  );

const createQuestionEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CREATE_QUESTION),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requested, succeeded, failed }]) => {
      const { quizId, body, choices, correctAnswer, createdAt } = action;
      const question = {
        body,
        choices,
        correctAnswer,
        createdAt
      };
      return from(
        firebase.questions(quizId).add({
          ...question
        })
      ).pipe(
        map(doc => doc.id),
        map(questionId => {
          const state = state$.value;
          const quizQuestions = selectors.selectQuizQuestions(state, quizId);
          return {
            type: succeeded,
            quizId,
            response: normalize(
              {
                quizId: quizId,
                questions: [...quizQuestions, { id: questionId, ...question }]
              },
              schemas.quizQuestion
            )
          };
        }),
        catchError(error => ({ type: failed, error })),
        startWith({ type: requested })
      );
    })
  );

const updateQuestionEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.UPDATE_QUESTION),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requested, succeeded, failed }]) => {
      const { quizId, questionId, body, choices, correctAnswer } = action;
      const updatedValues = {
        body,
        choices,
        correctAnswer
      };
      const batch = firebase.db.batch();
      const quizQuestionRef = firebase.question(quizId, questionId);
      batch.update(quizQuestionRef, updatedValues);
      return from(batch.commit()).pipe(
        map(() => {
          const state = state$.value;
          let question = selectors.selectQuestion(state, questionId);
          question = {
            ...question,
            ...updatedValues
          };
          return {
            type: succeeded,
            quizId,
            response: normalize(question, schemas.question)
          };
        }),
        catchError(() => of({ type: failed })),
        startWith({ type: requested })
      );
    })
  );

const deleteQuestionConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUESTION_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requested, succeeded, failed }]) => {
      const { quizId, questionId } = action;
      return from(firebase.question(quizId, questionId).delete()).pipe(
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
        handler => firebase.auth.onAuthStateChanged(handler),
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
  createQuestionEpic,
  updateQuestionEpic,
  deleteQuestionConfirmedEpic,
  listenAuthStateEpic
);

export default rootEpic;
