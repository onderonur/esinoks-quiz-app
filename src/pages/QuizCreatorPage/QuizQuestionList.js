import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import BaseList from "components/BaseList";
import useFirebase from "hooks/useFirebase";
import { receiveQuizQuestions } from "actions";
import QuizQuestionListItem from "./QuizQuestionListItem";
import DeleteQuestionConfirmationDialog from "./DeleteQuestionConfirmationDialog";

const QuizQuestionList = ({ quizId }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const [isFetching, setIsFetching] = useState(true);
  const quizQuestionIds = useSelector(state =>
    selectors.selectQuestionIdsByQuizId(state, quizId)
  );

  useEffect(() => {
    const listener = firebase
      .questions(quizId)
      .onSnapshot(questionSnapshots => {
        var questions = [];
        questionSnapshots.forEach(doc => {
          questions.push({
            id: doc.id,
            ...doc.data()
          });
        });
        dispatch(receiveQuizQuestions(quizId, questions));
        setIsFetching(false);
      });

    return () => listener();
  }, [dispatch, firebase, quizId]);

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
