import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveQuiz } from "actions";
import { selectors } from "reducers";
import useFirebaseListener from "./useFirebaseListener";

const useListenQuiz = quizId => {
  const isNew = quizId === "new";
  const dispatch = useDispatch();
  const quiz = useSelector(state =>
    isNew ? null : selectors.selectQuizById(state, quizId)
  );

  const query = useCallback(
    firebase => {
      return firebase.quiz(quizId);
    },
    [quizId]
  );

  const { isFetching, snapshot } = useFirebaseListener({
    query,
    skip: isNew
  });

  useEffect(() => {
    if (snapshot) {
      dispatch(receiveQuiz(snapshot));
    }
  }, [dispatch, snapshot]);

  return { isFetching, quiz };
};

export default useListenQuiz;
