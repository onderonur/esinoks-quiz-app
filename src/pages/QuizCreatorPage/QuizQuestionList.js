import React from "react";
import BaseList from "components/BaseList";
import QuizQuestionListItem from "./QuizQuestionListItem";
import DeleteQuestionConfirmationDialog from "./DeleteQuestionConfirmationDialog";
import useListenQuizQuestions from "hooks/useListenQuizQuestions";

const QuizQuestionList = ({ quizId }) => {
  const { isFetching, quizQuestionIds } = useListenQuizQuestions(quizId);

  return (
    <>
      <BaseList
        loading={isFetching}
        data={quizQuestionIds}
        renderItem={(questionId, index) => (
          <QuizQuestionListItem
            key={questionId}
            index={index}
            quizId={quizId}
            questionId={questionId}
          />
        )}
      />
      <DeleteQuestionConfirmationDialog />
    </>
  );
};

export default QuizQuestionList;
