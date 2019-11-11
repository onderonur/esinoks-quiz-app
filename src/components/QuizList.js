import React from "react";
import BaseList from "components/BaseList";
import QuizListItem from "./QuizListItem";

const QuizList = ({ quizIds, isFetching, hasActions }) => {
  const renderItem = (quizId, index) => (
    <QuizListItem
      key={quizId}
      quizId={quizId}
      index={index}
      hasActions={hasActions}
    />
  );

  return (
    <BaseList loading={isFetching} data={quizIds} renderItem={renderItem} />
  );
};

export default QuizList;
