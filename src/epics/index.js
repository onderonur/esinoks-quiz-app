import * as actionTypes from "constants/actionTypes";
import { ofType, combineEpics } from "redux-observable";
import {
  exhaustMap,
  map,
  startWith,
  mapTo,
  catchError,
  tap,
  switchMap,
  take,
  takeUntil,
  ignoreElements
} from "rxjs/operators";
import { from, of } from "rxjs";
import firebase from "app-firebase";
import { getFetchActionTypes } from "utils";

const mapWithFetchActionTypes = () =>
  map(action => {
    const { type } = action;
    const { requestType, successType, errorType } = getFetchActionTypes(type);
    return [action, { requestType, successType, errorType }];
  });

const createQuizEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.CREATE_QUIZ),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const { title, authorId } = action;

      return from(
        firebase.quizzes().add({
          title,
          authorId
        })
      ).pipe(
        map(doc => doc.id),
        map(quizId => ({ type: successType, quizId })),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const redirectAfterCreateQuizSuccessEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.CREATE_QUIZ),
    mapWithFetchActionTypes(),
    switchMap(([action, { successType, errorType }]) =>
      action$.pipe(
        ofType(successType),
        take(1),
        tap(successAction =>
          action.history.replace(`/profile/quiz/${successAction.quizId}`)
        ),
        ignoreElements(),
        takeUntil(action$.pipe(ofType(errorType)))
      )
    )
  );

const updateQuizEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.UPDATE_QUIZ),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const { quizId, title } = action;

      return from(
        firebase.quiz(quizId).update({
          title
        })
      ).pipe(
        mapTo({ type: successType }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const deleteQuizConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUIZ_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const { quizId } = action;
      return from(firebase.quiz(quizId).delete()).pipe(
        mapTo({ type: successType, quizId }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const { successType: DELETE_QUIZ_CONFIRMED_SUCCESS } = getFetchActionTypes(
  actionTypes.DELETE_QUIZ_CONFIRMED
);
// When we delete a quiz successfully, we also delete its files too.
// TODO: Düzelt bunu
const deleteQuizImagesEpic = action$ =>
  action$.pipe(
    ofType(DELETE_QUIZ_CONFIRMED_SUCCESS),
    tap(action => {
      const { quizId } = action;
      const storageRef = firebase.storage.ref();
      const filesRef = storageRef.child(`quiz-images/${quizId}`);
      // TODO: This gives 404. Fix it.
      from(filesRef.delete());
    }),
    ignoreElements()
  );

const createQuestionEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.CREATE_QUESTION),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const { quizId, body, choices, correctAnswer } = action;

      const batch = firebase.db.batch();
      const quizQuestionsRef = firebase.questions(quizId).doc();
      batch.set(quizQuestionsRef, { body, choices, correctAnswer });
      return from(batch.commit()).pipe(
        mapTo({ type: successType }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const updateQuestionEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.UPDATE_QUESTION),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const { quizId, questionId, body, choices, correctAnswer } = action;

      const batch = firebase.db.batch();
      const quizQuestionRef = firebase.question(quizId, questionId);
      batch.update(quizQuestionRef, { body, choices, correctAnswer });
      return from(batch.commit()).pipe(
        mapTo({ type: successType }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const deleteQuestionConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUESTION_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) =>
      from(firebase.question(action.quizId, action.questionId).delete()).pipe(
        mapTo({ type: successType }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      )
    )
  );

const rootEpic = combineEpics(
  createQuizEpic,
  updateQuizEpic,
  deleteQuizConfirmedEpic,
  deleteQuizImagesEpic,
  redirectAfterCreateQuizSuccessEpic,
  createQuestionEpic,
  updateQuestionEpic,
  deleteQuestionConfirmedEpic
);

export default rootEpic;
