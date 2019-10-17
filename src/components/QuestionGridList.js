import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import BaseGridList from "./BaseGridList";
import QuestionGridListItem from "./QuestionGridListItem";

const QuestionGridList = () => {
  const allQuestionIds = useSelector(state =>
    selectors.selectAllQuestionIds(state)
  );

  return (
    <BaseGridList
      items={allQuestionIds}
      renderItem={questionId => (
        <QuestionGridListItem questionId={questionId} />
      )}
    />
  );
};

export default QuestionGridList;
