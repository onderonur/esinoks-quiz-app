import React, { useEffect } from "react";
import BaseGridList from "components/BaseGridList";
import QuestionGridListItem from "./QuestionGridListItem";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { fetchQuizQuestions } from "actions";

const QuestionGridList = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingQuizQuestions(state, quizId)
  );
  const quizQuestionIds = useSelector(state =>
    selectors.selectQuestionIdsByQuizId(state, quizId)
  );

  useEffect(() => {
    dispatch(fetchQuizQuestions(quizId));
  }, [dispatch, quizId]);

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
