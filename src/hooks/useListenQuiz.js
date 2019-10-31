import { useState, useEffect } from "react";
import useFirebase from "hooks/useFirebase";
import { useSelector, useDispatch } from "react-redux";
import { receiveQuiz } from "actions";
import { selectors } from "reducers";

const useListenQuiz = quizId => {
  const isNew = quizId === "new";
  const [isFetching, setIsFetching] = useState(!isNew);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const quiz = useSelector(state =>
    isNew ? null : selectors.selectQuizById(state, quizId)
  );

  useEffect(() => {
    if (!isNew) {
      const listener = firebase.quiz(quizId).onSnapshot(quizDoc => {
        dispatch(receiveQuiz(quizDoc));
        setIsFetching(false);
      });

      return () => listener();
    }
  }, [firebase, dispatch, quizId, isNew]);

  return { isFetching, quiz };
};

export default useListenQuiz;
