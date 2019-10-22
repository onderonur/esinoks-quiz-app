import { data } from "reducers/questions";
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

const checkAnswer = questionId => {
  return new Promise(resolve => {
    const question = data.find(question => question.id === questionId);
    const { choices } = question;
    var answer = choices[Math.floor(Math.random() * choices.length)];

    setTimeout(() => {
      resolve(answer.id);
    }, 1000);
  });
};

const answerQuestionEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.ANSWER_QUESTION),
    exhaustMap(action =>
      from(checkAnswer(action.questionId)).pipe(
        map(result => ({
          type: actionTypes.ANSWER_QUESTION_SUCCESS,
          questionId: action.questionId,
          choiceId: action.choiceId,
          answerId: result
        })),
        startWith({ type: actionTypes.ANSWER_QUESTION_REQUEST })
      )
    )
  );

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
    exhaustMap(([action, { requestType, successType, errorType }]) =>
      from(firebase.quiz(action.quizId).delete()).pipe(
        mapTo({ type: successType }),
        catchError(() => of({ type: errorType })),
        startWith({ type: requestType })
      )
    )
  );

const rootEpic = combineEpics(
  answerQuestionEpic,
  createQuizEpic,
  updateQuizEpic,
  deleteQuizConfirmedEpic,
  redirectAfterCreateQuizSuccessEpic
);

export default rootEpic;
