import { TOTAL_HEARTS_COUNT } from "pages/QuizPage/Hearts";
import { combineReducers } from "redux";
import bindSelectors from "./utils/bindSelectors";
import questions, * as fromQuestions from "./questions";
import activeQuestionId, * as fromActiveQuestionId from "./activeQuestionId";
import givenAnswers, * as fromGivenAnswers from "./givenAnswers";
import authUser, * as fromAuthUser from "./authUser";
import dialogs, * as fromDialogs from "./dialogs";
import quizQuestions, * as fromQuizQuestions from "./quizQuestions";
import isFetching, * as fromIsFetching from "./isFetching";
import authUserQuizzes, * as fromAuthUserQuizzes from "./authUserQuizzes";
import entities, * as fromEntities from "./entities";

// TODO: Simplify and clean reducers

const rootReducer = combineReducers({
  entities,
  isFetching,
  questions,
  activeQuestionId,
  givenAnswers,
  authUser,
  dialogs,
  quizQuestions,
  authUserQuizzes
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

const givenAnswersSelectors = bindSelectors(
  state => state.givenAnswers,
  fromGivenAnswers.selectors
);

const authUserSelectors = bindSelectors(
  state => state.authUser,
  fromAuthUser.selectors
);

const quizQuestionsSelectors = bindSelectors(
  state => state.quizQuestions,
  fromQuizQuestions.selectors
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

const entitiesSelectors = bindSelectors(
  state => state.entities,
  fromEntities.selectors
);

const selectQuizQuestions = (state, quizId) => {
  const quizQuestionIds = quizQuestionsSelectors.selectQuestionIdsByQuizId(
    state,
    quizId
  );
  const quizQuestions = quizQuestionIds.map(questionId =>
    entitiesSelectors.selectQuestion(state, questionId)
  );
  return quizQuestions;
};

const selectCorrectAnswersByQuizId = (state, quizId) => {
  const quizQuestions = selectQuizQuestions(state, quizId);
  const correctAnswers = quizQuestions.reduce((prev, question) => {
    const { correctAnswer } = question;
    const hasCorrectAnswer = correctAnswer !== undefined;
    return hasCorrectAnswer
      ? { ...prev, [question.id]: question.correctAnswer }
      : prev;
  }, {});
  return correctAnswers;
};

const selectGivenAnswersByQuizId = (state, quizId) => {
  const quizQuestionIds = quizQuestionsSelectors.selectQuestionIdsByQuizId(
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
  const quizQuestionIds = quizQuestionsSelectors.selectQuestionIdsByQuizId(
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
  ...questionsSelectors,
  ...givenAnswersSelectors,
  ...authUserSelectors,
  ...quizQuestionsSelectors,
  ...dialogsSelectors,
  ...isFetchingSelectors,
  ...authUserQuizzesSelectors,
  ...entitiesSelectors,
  selectActiveQuestion: state => {
    const id = activeQuestionIdSelectors.selectActiveQuestionId(state);
    const activeQuestion = entitiesSelectors.selectQuestion(state, id);
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
