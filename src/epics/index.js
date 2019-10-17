import { data } from "reducers/questions";
import * as actionTypes from "constants/actionTypes";
import { ofType, combineEpics } from "redux-observable";
import { exhaustMap, map, startWith } from "rxjs/operators";
import { from } from "rxjs";

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

export const answerQuestionEpic = action$ =>
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

const rootEpic = combineEpics(answerQuestionEpic);

export default rootEpic;
