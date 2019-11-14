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
import { getFetchActionTypes } from "utils";
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
      const { title, authorId, createdAt } = action;
      return from(
        firebase.quizzes().add({
          title,
          authorId,
          createdAt
        })
      ).pipe(
        map(doc => doc.id),
        map(quizId => ({ type: successType, quizId })),
        catchError(error => ({ type: errorType, error })),
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

const updateQuizEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.UPDATE_QUIZ),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const state = state$.value;
      const { quizId, title } = action;
      const updatedValues = {
        title
      };
      return from(firebase.quiz(quizId).update(updatedValues)).pipe(
        map(() => {
          let quiz = selectors.selectQuizById(state, quizId);
          quiz = {
            ...quiz,
            ...updatedValues
          };
          return { type: successType, quiz };
        }),
        catchError(error => ({ type: errorType, error })),
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
        map(() => ({ type: successType, quizId })),
        catchError(error => ({ type: errorType, error })),
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
        map(questionId => ({
          type: successType,
          quizId,
          question: { id: questionId, ...question }
        })),
        catchError(error => ({ type: errorType, error })),
        startWith({ type: requestType })
      );
    })
  );

const updateQuestionEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.UPDATE_QUESTION),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
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
          let question = selectors.selectQuestionById(state, questionId);
          question = {
            ...question,
            ...updatedValues
          };
          return {
            type: successType,
            quizId,
            question
          };
        }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
  );

const deleteQuestionConfirmedEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.DELETE_QUESTION_CONFIRMED),
    mapWithFetchActionTypes(),
    exhaustMap(([action, { requestType, successType, errorType }]) => {
      const { quizId, questionId } = action;
      return from(firebase.question(quizId, questionId).delete()).pipe(
        mapTo({ type: successType, quizId, questionId }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      );
    })
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

// A higher-order epic to fetch some query results
const createFetchEpic = ({
  type,
  mapOperator,
  query,
  processSnapshot,
  extraData = () => {}
}) => (action$, state$) =>
  action$.pipe(
    ofType(type),
    mapWithFetchActionTypes(),
    mapOperator(
      ([action, { requestType, successType, errorType, cancelType }]) =>
        from(query(action).get()).pipe(
          map(snapshot =>
            processSnapshot ? processSnapshot(snapshot) : snapshot
          ),
          map(response => ({
            ...action,
            type: successType,
            response,
            ...extraData(action, state$.value)
          })),
          takeUntil(action$.pipe(ofType(cancelType))),
          catchError(error =>
            of({
              ...action,
              type: errorType,
              error,
              ...extraData(action, state$.value)
            })
          ),
          startWith({
            ...action,
            type: requestType,
            ...extraData(action, state$.value)
          })
        )
    )
  );

// A higher-order epic to fetch a collection
const createFetchCollectionEpic = ({ type, query, extraData }) =>
  createFetchEpic({
    type,
    mapOperator: switchMap,
    query,
    extraData,
    processSnapshot: snapshot => {
      const { docs } = snapshot;
      const response = docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return response;
    }
  });

const fetchAuthUserQuizzesEpic = createFetchCollectionEpic({
  type: actionTypes.FETCH_AUTH_USER_QUIZZES,
  query: () => firebase.quizzes().orderBy("createdAt"),
  extraData: (action, state) => ({
    authUserId: selectors.selectAuthUser(state).uid
  })
});

const fetchQuizQuestionsEpic = createFetchCollectionEpic({
  type: actionTypes.FETCH_QUIZ_QUESTIONS,
  query: action => firebase.questions(action.quizId).orderBy("createdAt")
});

const fetchQuizEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_QUIZ),
    filter(action => action.quizId !== "new"),
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
            of(
              { type: actionTypes.NOT_FOUND, history },
              { type: errorType, quizId }
            )
          )
        ),
        catchError(() => of({ type: errorType, quizId })),
        startWith({ type: requestType, quizId })
      );
    })
  );

const notFoundContentEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.NOT_FOUND),
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
  fetchQuizQuestionsEpic,
  notFoundContentEpic
);

export default rootEpic;
