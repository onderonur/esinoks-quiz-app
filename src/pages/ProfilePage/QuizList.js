import React from "react";
import BaseList from "components/BaseList";
import QuizListItem from "./QuizListItem";

const QuizList = ({ quizIds, loading }) => {
  const renderItem = (quizId, index) => (
    <QuizListItem key={quizId} quizId={quizId} index={index} />
  );

  return <BaseList loading={loading} data={quizIds} renderItem={renderItem} />;
};

export default QuizList;
