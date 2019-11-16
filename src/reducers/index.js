import { TOTAL_HEARTS_COUNT } from "pages/QuizPage/Hearts";
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
  selectCorrectGivenAnswerCountByQuizId,
  selectWrongGivenAnswerCountByQuizId,
  selectIsGameOver: (state, quizId) => {
    const wrongGivenAnswersCount = selectWrongGivenAnswerCountByQuizId(
      state,
      quizId
    );
    return TOTAL_HEARTS_COUNT - wrongGivenAnswersCount < 0;
  }
};
