import { combineReducers } from "redux";
import bindSelectors from "./bindSelectors";
import questions, * as fromQuestions from "./questions";
import activeQuestionId, * as fromActiveQuestionId from "./activeQuestionId";
import quiz, * as fromQuiz from "./quiz";
import answers, * as fromAnswers from "./answers";

const rootReducer = combineReducers({
  questions,
  activeQuestionId,
  quiz,
  answers
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

export const selectors = {
  selectActiveQuestion: state => {
    const id = activeQuestionIdSelectors.selectActiveQuestionId(state);
    const activeQuestion = questionsSelectors.selectQuestionById(state, id);
    return activeQuestion;
  },
  ...bindSelectors(state => state.quiz, fromQuiz.selectors),
  ...questionsSelectors,
  ...bindSelectors(state => state.answers, fromAnswers.selectors)
};
