import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveQuizQuestions } from "actions";
import useFirebaseListener from "./useFirebaseListener";
import { useCallback, useEffect } from "react";

const useListenQuizQuestions = quizId => {
  const dispatch = useDispatch();

  const query = useCallback(
    firebase => {
      return firebase.questions(quizId);
    },
    [quizId]
  );

  const { isFetching, snapshot } = useFirebaseListener({
    query
  });

  useEffect(() => {
    const questions = [];
    if (snapshot) {
      snapshot.forEach(doc => {
        questions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      dispatch(receiveQuizQuestions(quizId, questions));
    }
  }, [dispatch, snapshot, quizId]);

  const quizQuestionIds = useSelector(state =>
    selectors.selectQuestionIdsByQuizId(state, quizId)
  );

  return { isFetching, quizQuestionIds };
};

export default useListenQuizQuestions;
