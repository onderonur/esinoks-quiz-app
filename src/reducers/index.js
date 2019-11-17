import { combineReducers } from "redux";
import bindSelectors from "./utils/bindSelectors";
import get from "lodash.get";
import activeQuestionId, * as fromActiveQuestionId from "./activeQuestionId";
import givenAnswers, * as fromGivenAnswers from "./givenAnswers";
import authUser, * as fromAuthUser from "./authUser";
import dialogs, * as fromDialogs from "./dialogs";
import isFetching, * as fromIsFetching from "./isFetching";
import authUserQuizzes, * as fromAuthUserQuizzes from "./authUserQuizzes";
import quizzes, * as fromQuizzes from "./quizzes";
import questions, * as fromQuestions from "./questions";
import quizQuestions, * as fromQuizQuestions from "./quizQuestions";

// TODO: Simplify and clean reducers
const TOTAL_HEARTS_COUNT = 3;

export const GAME_STATUSSES = {
  PLAYING: "PLAYING",
  WINNER: "WINNER",
  GAME_OVER: "GAME_OVER"
};

const rootReducer = combineReducers({
  isFetching,
  quizzes,
  questions,
  quizQuestions,
  activeQuestionId,
  givenAnswers,
  authUser,
  dialogs,
  authUserQuizzes
});

export default rootReducer;

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

const givenAnswersSelectors = bindSelectors(
  state => state.givenAnswers,
  fromGivenAnswers.selectors
);

const authUserSelectors = bindSelectors(
  state => state.authUser,
  fromAuthUser.selectors
);

const dialogsSelectors = bindSelectors(
  state => state.dialogs,
  fromDialogs.selectors
);

const isFetchingSelectors = bindSelectors(
  state => state.isFetching,
  fromIsFetching.selectors
);

const authUserQuizzesSelectors = bindSelectors(
  state => state.authUserQuizzes,
  fromAuthUserQuizzes.selectors
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

const selectGivenAnswersByQuizId = (state, quizId) => {
  const quizQuestionIds = quizQuestionsSelectors.selectQuizQuestionIds(
    state,
    quizId
  );
  const givenAnswers = quizQuestionIds.reduce((prev, questionId) => {
    const givenAnswer = selectors.selectGivenAnswerByQuestionId(
      state,
      questionId
    );
    const isAnswered = givenAnswer !== undefined;
    return isAnswered
      ? {
          ...prev,
          [questionId]: selectors.selectGivenAnswerByQuestionId(
            state,
            questionId
          )
        }
      : prev;
  }, {});
  return givenAnswers;
};

const selectCorrectGivenAnswerCountByQuizId = (state, quizId) => {
  const quizQuestionIds = quizQuestionsSelectors.selectQuizQuestionIds(
    state,
    quizId
  );
  const correctAnswers = selectCorrectAnswersByQuizId(state, quizId);
  const givenAnswers = selectGivenAnswersByQuizId(state, quizId);
  const result = quizQuestionIds.reduce((prev, questionId) => {
    return correctAnswers[questionId] === givenAnswers[questionId]
      ? prev + 1
      : prev;
  }, 0);
  return result;
};

const selectWrongGivenAnswerCountByQuizId = (state, quizId) => {
  const givenAnswersCount = Object.keys(
    selectGivenAnswersByQuizId(state, quizId)
  ).length;
  const correctGivenAnswerCount = selectCorrectGivenAnswerCountByQuizId(
    state,
    quizId
  );
  return givenAnswersCount - correctGivenAnswerCount;
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

  const totalHearts = TOTAL_HEARTS_COUNT;

  let remainingHearts = totalHearts - wrongGivenAnswerCount;

  const isGameOver = remainingHearts < 0;

  let status = GAME_STATUSSES.PLAYING;

  if (
    totalQuestionCount &&
    correctGivenAnswerCount + wrongGivenAnswerCount === totalQuestionCount &&
    !isGameOver
  ) {
    status = GAME_STATUSSES.WINNER;
  } else if (isGameOver) {
    status = GAME_STATUSSES.GAME_OVER;
  }

  // TODO: ÖNEMLİ: Toplam soru sayısı, toplam kalp sayısından azsa veya eşitse (3) sorun çıkıyor. Kontrol et.
  // Full yanlış cevap verse bile "tebrikler" diyor ama astronot yerinde kalıyor.

  // We reduce the "steps to finish" by the wrong given answers count.
  // So that the user can reach the finish point even if there are wrong answers.
  const totalStepsToFinish = totalQuestionCount
    ? totalQuestionCount - wrongGivenAnswerCount
    : null;

  const progressRate = correctGivenAnswerCount / totalStepsToFinish;

  return {
    correctGivenAnswerCount,
    wrongGivenAnswerCount,
    totalQuestionCount,
    totalStepsToFinish,
    progressRate,
    totalHearts,
    remainingHearts,
    status
  };
};

export const selectors = {
  ...isFetchingSelectors,
  ...quizzesSelectors,
  ...questionsSelectors,
  ...quizQuestionsSelectors,
  ...givenAnswersSelectors,
  ...authUserSelectors,
  ...dialogsSelectors,
  ...authUserQuizzesSelectors,
  selectActiveQuestion: state => {
    const id = activeQuestionIdSelectors.selectActiveQuestionId(state);
    const activeQuestion = questionsSelectors.selectQuestion(state, id);
    return activeQuestion;
  },
  selectQuizGameInfo
};
