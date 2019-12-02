import React, { useEffect } from "react";
import BaseList from "components/BaseList";
import QuizQuestionListItem from "./QuizQuestionListItem";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { fetchQuizQuestions } from "actions";

const QuizQuestionList = ({ quizId }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector(state =>
    selectors.selectAsyncInfoQuizQuestions(state, quizId)
  );
  const quizQuestionIds = useSelector(state =>
    selectors.selectQuizQuestionIds(state, quizId)
  );

  useEffect(() => {
    dispatch(fetchQuizQuestions(quizId));
  }, [dispatch, quizId]);

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
    </>
  );
};

export default QuizQuestionList;
