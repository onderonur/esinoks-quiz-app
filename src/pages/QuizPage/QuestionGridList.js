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
      minItemWidth={110}
      renderItem={(questionId, i) => (
        <QuestionGridListItem questionId={questionId} index={i} />
      )}
    />
  );
};

export default QuestionGridList;
