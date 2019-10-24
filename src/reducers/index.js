import { combineReducers } from "redux";
import bindSelectors from "./bindSelectors";
import questions, * as fromQuestions from "./questions";
import activeQuestionId, * as fromActiveQuestionId from "./activeQuestionId";
import quiz, * as fromQuiz from "./quiz";
import answers, * as fromAnswers from "./answers";
import authUser, * as fromAuthUser from "./authUser";
import dialogs, * as fromDialogs from "./dialogs";
import quizzes, * as fromQuizzes from "./quizzes";
import quizQuestions, * as fromQuizQuestions from "./quizQuestions";
import isFetching, * as fromIsFetching from "./isFetching";

const rootReducer = combineReducers({
  questions,
  activeQuestionId,
  quiz,
  answers,
  authUser,
  dialogs,
  quizzes,
  quizQuestions,
  isFetching
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

const authUserSelectors = bindSelectors(
  state => state.authUser,
  fromAuthUser.selectors
);

const quizSelectors = bindSelectors(
  state => state.quizzes,
  fromQuizzes.selectors
);

const selectAuthUserQuizIds = state => {
  const authUser = authUserSelectors.selectAuthUser(state);
  const { uid } = authUser;
  const authUserQuizIds = quizSelectors.selectQuizIdsByAuthorId(state, uid);
  return authUserQuizIds;
};

const selectAllAnswerResults = state => {
  const questionIds = questionsSelectors.selectAllQuestionIds(state);
  const answerResults = questionIds.map(questionId =>
    answerSelectors.selectAnswerResultByQuestionId(state, questionId)
  );

  return answerResults;
};

export const selectors = {
  ...questionsSelectors,
  ...answerSelectors,
  ...authUserSelectors,
  ...quizSelectors,
  ...bindSelectors(state => state.quiz, fromQuiz.selectors),
  ...bindSelectors(state => state.dialogs, fromDialogs.selectors),
  ...bindSelectors(state => state.isFetching, fromIsFetching.selectors),
  ...bindSelectors(state => state.quizQuestions, fromQuizQuestions.selectors),
  selectAuthUserQuizIds,
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
  }
};
