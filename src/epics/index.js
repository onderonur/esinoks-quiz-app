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
  ignoreElements,
  mergeMap,
  filter
} from "rxjs/operators";
import { from, of, fromEventPattern, iif } from "rxjs";
import firebase from "app-firebase";
import { getFetchActionTypes, getFirestoreTimeStamp } from "utils";
import { selectors } from "reducers";

const mapWithFetchActionTypes = () =>
  map(action => {
    const { type } = action;
    const {
      requestType,
      successType,
      errorType,
      cancelType
    } = getFetchActionTypes(type);
    return [action, { requestType, successType, errorType, cancelType }];
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
          authorId,
          // TODO: May add this "createdAt" field with cloud functions
          createdAt: getFirestoreTimeStamp(new Date())
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

// When we delete a quiz successfully, we also delete its files too.
// TODO: Düzelt bunu
const deleteQuizImagesEpic = action$ =>
  action$.pipe(
    ofType(getFetchActionTypes(actionTypes.DELETE_QUIZ_CONFIRMED).successType),
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
      batch.set(quizQuestionsRef, {
        body,
        choices,
        correctAnswer,
        createdAt: getFirestoreTimeStamp(new Date())
      });
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

const listenAuthStateEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.LISTEN_AUTH_STATE),
    mapWithFetchActionTypes(),
    mergeMap(
      ([action, { requestType, successType, errorType, cancelType }]) => {
        // Inspired from: https://stackoverflow.com/questions/50655236/how-to-use-firestore-realtime-updates-onsnapshot-with-redux-observable-rxjs/56503403#56503403
        return fromEventPattern(
          handler => firebase.auth.onAuthStateChanged(handler),
          (handler, unsubscribe) => unsubscribe()
        ).pipe(
          map(authUser => ({
            type: successType,
            authUser
          })),
          catchError(error => of({ type: errorType, error })),
          takeUntil(action$.pipe(ofType(cancelType))),
          startWith({ type: requestType })
        );
      }
    )
  );

const fetchAuthUserQuizzesEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.FETCH_AUTH_USER_QUIZZES),
    mapWithFetchActionTypes(),
    switchMap(([action, { requestType, successType, errorType }]) => {
      const query = firebase.quizzes().orderBy("createdAt");
      const authUser = selectors.selectAuthUser(state$.value);
      const authUserId = authUser.uid;
      return from(query.get()).pipe(
        map(snapshot => snapshot.docs),
        map(docs => docs.map(doc => ({ id: doc.id, ...doc.data() }))),
        map(quizzes => ({ type: successType, quizzes, authUserId })),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const fetchQuizQuestionsEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_QUIZ_QUESTIONS),
    mapWithFetchActionTypes(),
    switchMap(([action, { requestType, successType, errorType }]) => {
      const { quizId } = action;
      const query = firebase.questions(quizId).orderBy("createdAt");
      return from(query.get()).pipe(
        map(snapshot => snapshot.docs),
        map(docs => docs.map(doc => ({ id: doc.id, ...doc.data() }))),
        map(questions => ({ type: successType, quizId, questions })),
        catchError(() => of({ type: errorType, quizId })),
        startWith({ type: requestType, quizId })
      );
    })
  );

const fetchQuizEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_QUIZ),
    mapWithFetchActionTypes(),
    switchMap(([action, { requestType, successType, errorType }]) => {
      const { quizId, history } = action;
      const query = firebase.quiz(quizId);
      return from(query.get()).pipe(
        mergeMap(snapshot =>
          iif(
            () => snapshot.exists,
            of({
              type: successType,
              quizId,
              quiz: { id: snapshot.id, ...snapshot.data() }
            }),
            of({ type: errorType, quizId, status: 404, history })
          )
        ),
        catchError(() => of({ type: errorType, quizId })),
        startWith({ type: requestType, quizId })
      );
    })
  );

// It redirects user to "404" page when a quiz is not found.
const quizNotFoundEpic = action$ =>
  action$.pipe(
    ofType(getFetchActionTypes(actionTypes.FETCH_QUIZ).errorType),
    filter(action => action.status === 404),
    tap(action => action.history.push("/not-found-404")),
    ignoreElements()
  );

const rootEpic = combineEpics(
  createQuizEpic,
  updateQuizEpic,
  deleteQuizConfirmedEpic,
  deleteQuizImagesEpic,
  redirectAfterCreateQuizSuccessEpic,
  createQuestionEpic,
  updateQuestionEpic,
  deleteQuestionConfirmedEpic,
  listenAuthStateEpic,
  fetchAuthUserQuizzesEpic,
  fetchQuizEpic,
  quizNotFoundEpic,
  fetchQuizQuestionsEpic
);

export default rootEpic;
