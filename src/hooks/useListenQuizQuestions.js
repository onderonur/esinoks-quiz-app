import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import useFirebase from "hooks/useFirebase";
import { receiveQuizQuestions } from "actions";

const useListenQuizQuestions = quizId => {
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
        const questions = [];
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

  return { isFetching, quizQuestionIds };
};

export default useListenQuizQuestions;
