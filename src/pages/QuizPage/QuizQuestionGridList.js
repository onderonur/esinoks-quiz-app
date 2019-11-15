import React, { useEffect } from "react";
import BaseGridList from "components/BaseGridList";
import QuizQuestionGridListItem from "./QuizQuestionGridListItem";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { fetchQuizQuestions } from "actions";
import LoadingIndicator from "components/LoadingIndicator";

const QuizQuestionGridList = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingQuizQuestions(state, quizId)
  );
  const quizQuestionIds = useSelector(state =>
    selectors.selectQuizQuestionIds(state, quizId)
  );

  useEffect(() => {
    dispatch(fetchQuizQuestions(quizId));
  }, [dispatch, quizId]);

  return (
    <LoadingIndicator loading={isFetching}>
      <BaseGridList
        items={quizQuestionIds}
        minItemWidth={110}
        renderItem={(questionId, i) => (
          <QuizQuestionGridListItem questionId={questionId} index={i} />
        )}
      />
    </LoadingIndicator>
  );
};

export default QuizQuestionGridList;
