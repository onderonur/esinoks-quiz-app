import { combineReducers } from "redux";
import bindSelectors from "./utils/bindSelectors";
import get from "lodash.get";
import asyncInfo, * as fromAsyncInfo from "./asyncInfo";
import activeQuestionId, * as fromActiveQuestionId from "./activeQuestionId";
import authUser, * as fromAuthUser from "./authUser";
import dialogs, * as fromDialogs from "./dialogs";
import notifications, * as fromNotifications from "./notifications";
import authUserQuizzes, * as fromAuthUserQuizzes from "./authUserQuizzes";
import quizzes, * as fromQuizzes from "./quizzes";
import questions, * as fromQuestions from "./questions";
import quizQuestions, * as fromQuizQuestions from "./quizQuestions";
import givenAnswers, * as fromGivenAnswers from "./givenAnswers";
import GAME_STATUSSES from "constants/gameStatusses";

const TOTAL_HEARTS_COUNT = 2;

// TODO: Simplify and clean reducers a little bit more.
// TODO: Reset store on login/logout.

const rootReducer = combineReducers({
  asyncInfo,
  notifications,
  quizzes,
  questions,
  quizQuestions,
  activeQuestionId,
  authUser,
  dialogs,
  authUserQuizzes,
  givenAnswers
});

export default rootReducer;

const asyncInfoSelectors = bindSelectors(
  state => state.asyncInfo,
  fromAsyncInfo.selectors
);

const quizzesSelectors = bindSelectors(
  state => state.quizzes,
  fromQuizzes.selectors
);

const questionsSelectors = bindSelectors(
  state => state.questions,
  fromQuestions.selectors
);

const quizQuestionsSelectors = bindSelectors(
  state => state.quizQuestions,
  fromQuizQuestions.selectors
);

const activeQuestionIdSelectors = bindSelectors(
  state => state.activeQuestionId,
  fromActiveQuestionId.selectors
);

const authUserSelectors = bindSelectors(
  state => state.authUser,
  fromAuthUser.selectors
);

const dialogsSelectors = bindSelectors(
  state => state.dialogs,
  fromDialogs.selectors
);

const authUserQuizzesSelectors = bindSelectors(
  state => state.authUserQuizzes,
  fromAuthUserQuizzes.selectors
);

const notificationsSelectors = bindSelectors(
  state => state.notifications,
  fromNotifications.selectors
);

const givenAnswersSelectors = bindSelectors(
  state => state.givenAnswers,
  fromGivenAnswers.selectors
);

const selectQuizQuestions = (state, quizId) => {
  const quizQuestionIds = quizQuestionsSelectors.selectQuizQuestionIds(
    state,
    quizId
  );
  const quizQuestions = quizQuestionIds.map(questionId =>
    questionsSelectors.selectQuestion(state, questionId)
  );
  return quizQuestions;
};

const selectCorrectAnswersByQuizId = (state, quizId) => {
  const quizQuestions = selectQuizQuestions(state, quizId);
  const correctAnswers = quizQuestions.reduce((prev, question) => {
    const correctAnswer = get(question, "correctAnswer");
    const hasCorrectAnswer = correctAnswer !== undefined;
    return hasCorrectAnswer
      ? { ...prev, [question.id]: question.correctAnswer }
      : prev;
  }, {});
  return correctAnswers;
};

const selectCorrectGivenAnswerCountByQuizId = (state, quizId) => {
  const quizQuestionIds = quizQuestionsSelectors.selectQuizQuestionIds(
    state,
    quizId
  );
  const correctAnswers = selectCorrectAnswersByQuizId(state, quizId);
  const givenAnswers = givenAnswersSelectors.selectGivenAnswersOfQuiz(
    state,
    quizId
  );
  const result = quizQuestionIds.reduce((prev, questionId) => {
    return correctAnswers[questionId] === givenAnswers[questionId]
      ? prev + 1
      : prev;
  }, 0);
  return result;
};

const selectWrongGivenAnswerCountByQuizId = (state, quizId) => {
  const givenAnswersCount = Object.keys(
    givenAnswersSelectors.selectGivenAnswersOfQuiz(state, quizId)
  ).length;
  const correctGivenAnswerCount = selectCorrectGivenAnswerCountByQuizId(
    state,
    quizId
  );
  const wrongGivenAnswerCount = givenAnswersCount - correctGivenAnswerCount;
  return wrongGivenAnswerCount;
};

const selectQuizGameInfo = (state, quizId) => {
  const correctGivenAnswerCount = selectCorrectGivenAnswerCountByQuizId(
    state,
    quizId
  );
  const wrongGivenAnswerCount = selectWrongGivenAnswerCountByQuizId(
    state,
    quizId
  );
  const totalQuestionCount = quizQuestionsSelectors.selectTotalQuestionCountByQuizId(
    state,
    quizId
  );

  let status = GAME_STATUSSES.PLAYING;

  const totalHearts = TOTAL_HEARTS_COUNT;

  let remainingHearts = totalHearts - wrongGivenAnswerCount;

  const isGameOver = remainingHearts < 0;

  if (isGameOver) {
    status = GAME_STATUSSES.GAME_OVER;
  } else if (
    totalQuestionCount &&
    correctGivenAnswerCount + wrongGivenAnswerCount === totalQuestionCount &&
    !isGameOver
  ) {
    status = GAME_STATUSSES.WINNER;
  }

  // TODO: (ÖNEMLİ) Toplam soru sayısı, toplam kalp sayısından azsa veya eşitse (2) sorun çıkıyor. Kontrol et.
  // Full yanlış cevap verse bile "tebrikler" diyor ama astronot yerinde kalıyor.

  // We reduce the "steps to finish" by the wrong given answers count.
  // So that the user can reach the finish point even if there are wrong answers.
  const totalStepsToFinish = totalQuestionCount
    ? totalQuestionCount - wrongGivenAnswerCount
    : null;

  const progressRate = correctGivenAnswerCount / totalStepsToFinish;

  const gameInfo = {
    totalStepsToFinish,
    progressRate,
    status,
    totalHearts,
    remainingHearts,
    correctGivenAnswerCount,
    wrongGivenAnswerCount
  };

  return gameInfo;
};

const selectActiveQuestion = state => {
  const questionId = activeQuestionIdSelectors.selectActiveQuestionId(state);
  const activeQuestion = questionsSelectors.selectQuestion(state, questionId);
  return activeQuestion;
};

export const selectors = {
  ...asyncInfoSelectors,
  ...notificationsSelectors,
  ...quizzesSelectors,
  ...questionsSelectors,
  ...quizQuestionsSelectors,
  ...authUserSelectors,
  ...dialogsSelectors,
  ...authUserQuizzesSelectors,
  ...givenAnswersSelectors,
  ...activeQuestionIdSelectors,
  selectActiveQuestion,
  selectQuizGameInfo
};
