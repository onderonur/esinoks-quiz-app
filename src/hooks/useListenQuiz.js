import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveQuiz } from "actions";
import { selectors } from "reducers";
import useFirebaseListener from "./useFirebaseListener";
import { useHistory } from "react-router-dom";

const useListenQuiz = quizId => {
  const history = useHistory();
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
      if (snapshot.exists) {
        const quiz = {
          id: snapshot.id,
          ...snapshot.data()
        };
        dispatch(receiveQuiz(quiz));
      } else {
        history.push("/not-found-404");
      }
    }
  }, [dispatch, history, snapshot]);

  return { isFetching, quiz };
};

export default useListenQuiz;
