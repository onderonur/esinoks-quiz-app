import React from "react";
import BaseGridList from "components/BaseGridList";
import QuestionGridListItem from "./QuestionGridListItem";
import useListenQuizQuestions from "hooks/useListenQuizQuestions";
import { useParams } from "react-router-dom";

const QuestionGridList = () => {
  const { quizId } = useParams();
  const { isFetching, quizQuestionIds } = useListenQuizQuestions(quizId);

  return (
    <BaseGridList
      loading={isFetching}
      items={quizQuestionIds}
      renderItem={questionId => (
        <QuestionGridListItem questionId={questionId} />
      )}
    />
  );
};

export default QuestionGridList;
