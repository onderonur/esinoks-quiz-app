import React from "react";
import QuestionGridList from "./QuestionGridList";
import QuestionDialog from "./QuestionDialog";
// import Journey from "./Journey";
import { useParams } from "react-router-dom";
import useListenQuiz from "hooks/useListenQuiz";
import LoadingIndicator from "components/LoadingIndicator";

const QuizPage = () => {
  const { quizId } = useParams();
  const { isFetching, quiz } = useListenQuiz(quizId);

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
