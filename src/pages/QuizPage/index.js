import React, { useEffect } from "react";
import QuestionGridList from "./QuestionGridList";
import QuestionDialog from "./QuestionDialog";
// import Journey from "./Journey";
import { useParams } from "react-router-dom";
import useListenQuiz from "hooks/useListenQuiz";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { restartQuizConfirmed } from "actions";

const QuizPage = () => {
  const { quizId } = useParams();
  const { isFetching, quiz } = useListenQuiz(quizId);
  const dispatch = useDispatch();

  useEffect(() => {
    // When user leaves this page, we clean the quiz state from the store.
    // Otherwise, when the user leaves the quiz and re-enters this page,
    // the previous answers would still be in the store.
    return () => {
      dispatch(restartQuizConfirmed());
    };
  }, [dispatch]);

  return quiz ? (
    <LoadingIndicator loading={isFetching}>
      {/* <Journey /> */}
      <QuestionGridList />
      <QuestionDialog />
    </LoadingIndicator>
  ) : // TODO: Redirect to 404 not found
  null;
};

export default QuizPage;
