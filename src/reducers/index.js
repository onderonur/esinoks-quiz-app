import { combineReducers } from "redux";
import bindSelectors from "./bindSelectors";
import questions, * as fromQuestions from "./questions";
import activeQuestionId, * as fromActiveQuestionId from "./activeQuestionId";
import quiz, * as fromQuiz from "./quiz";
import answers, * as fromAnswers from "./answers";
import authUser, * as fromAuthUser from "./authUser";
import dialogs, * as fromDialogs from "./dialogs";
import ownQuizzes, * as fromOwnQuizzes from "./ownQuizzes";

const rootReducer = combineReducers({
  questions,
  activeQuestionId,
  quiz,
  answers,
  authUser,
  dialogs,
  ownQuizzes
});

export default rootReducer;

const activeQuestionIdSelectors = bindSelectors(
  state => state.activeQuestionId,
  fromActiveQuestionId.selectors
);

const questionsSelectors = bindSelectors(
  state => state.questions,
  fromQuestions.selectors
);

const answerSelectors = bindSelectors(
  state => state.answers,
  fromAnswers.selectors
);

const selectAllAnswerResults = state => {
  const questionIds = questionsSelectors.selectAllQuestionIds(state);
  const answerResults = questionIds.map(questionId =>
    answerSelectors.selectAnswerResultByQuestionId(state, questionId)
  );

  return answerResults;
};

export const selectors = {
  selectActiveQuestion: state => {
    const id = activeQuestionIdSelectors.selectActiveQuestionId(state);
    const activeQuestion = questionsSelectors.selectQuestionById(state, id);
    return activeQuestion;
  },
  selectTotalTrueAnswerCount: state => {
    const answerResults = selectAllAnswerResults(state);
    const trueAnswerResults = answerResults.filter(
      result => result === fromAnswers.ANSWER_RESULTS.true
    );

    return trueAnswerResults.length;
  },
  ...bindSelectors(state => state.quiz, fromQuiz.selectors),
  ...questionsSelectors,
  ...answerSelectors,
  ...bindSelectors(state => state.authUser, fromAuthUser.selectors),
  ...bindSelectors(state => state.dialogs, fromDialogs.selectors),
  ...bindSelectors(state => state.ownQuizzes, fromOwnQuizzes.selectors)
};
