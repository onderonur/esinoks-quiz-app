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
import produce from "immer";

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

// TODO: Bu isim değişebilir.
const createPostEpic = ({
  type,
  mapOperator,
  post,
  processDoc,
  extraData = () => {}
}) => (action$, state$) =>
  action$.pipe(
    ofType(type),
    mapWithFetchActionTypes(),
    mapOperator(([action, { requestType, successType, errorType }]) =>
      from(post(action)).pipe(
        map(doc => (processDoc ? processDoc(doc) : doc)),
        map(response => ({
          ...action,
          type: successType,
          response,
          ...extraData(action, state$.value)
        })),
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

const createQuizEpic = createPostEpic({
  type: actionTypes.CREATE_QUIZ,
  mapOperator: exhaustMap,
  post: action => {
    const { title, authorId } = action;
    return firebase
      .quizzes()
      .add({
        title,
        authorId,
        // TODO: May add this "createdAt" field with cloud functions
        createdAt: getFirestoreTimeStamp(new Date())
      })
      .then(doc => console.log(doc));
  },
  processDoc: doc => ({ quizId: doc.id })
});

const redirectAfterCreateQuizSuccessEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.CREATE_QUIZ),
    mapWithFetchActionTypes(),
    switchMap(([action, { successType, errorType }]) =>
      action$.pipe(
        ofType(successType),
        take(1),
        tap(successAction =>
          action.history.replace(
            `/profile/quiz/${successAction.response.quizId}`
          )
        ),
        ignoreElements(),
        takeUntil(action$.pipe(ofType(errorType)))
      )
    )
  );

const updateQuizEpic = createPostEpic({
  type: actionTypes.UPDATE_QUIZ,
  mapOperator: exhaustMap,
  post: action => {
    const { quizId, title } = action;

    return firebase.quiz(quizId).update({
      title
    });
  },
  extraData: (action, state) => {
    const { quizId, title } = action;
    const quiz = selectors.selectQuizById(state, quizId);
    const updatedQuiz = produce(quiz, draft => {
      draft.title = title;
    });
    return { quiz: updatedQuiz };
  }
});

const deleteQuizConfirmedEpic = createPostEpic({
  type: actionTypes.DELETE_QUIZ_CONFIRMED,
  mapOperator: exhaustMap,
  post: action => {
    const { quizId } = action;
    return firebase.quiz(quizId).delete();
  },
  extraData: action => ({ quizId: action.quizId })
});

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

const createQuestionEpic = createPostEpic({
  type: actionTypes.CREATE_QUESTION,
  mapOperator: exhaustMap,
  post: action => {
    const { quizId, body, choices, correctAnswer } = action;

    return firebase.questions(quizId).add({
      body,
      choices,
      correctAnswer,
      createdAt: getFirestoreTimeStamp(new Date())
    });
  },
  processDoc: doc => ({ id: doc.id, ...doc.data() })
});

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
