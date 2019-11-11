import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveQuizzes } from "actions";
import useFirebaseCollection from "./useFirebaseCollection";

const useListenQuizzes = () => {
  const dispatch = useDispatch();
  const quizIds = useSelector(state => selectors.selectQuizIds(state));

  const query = useCallback(firebase => {
    return firebase
      .quizzes()
      .orderBy("createdAt")
      .limit(2);
  }, []);

  const { isFetching, docs, fetchMore } = useFirebaseCollection({
    query
  });

  useEffect(() => {
    if (docs) {
      const quizzes = [];
      docs.forEach(doc => {
        quizzes.push({
          id: doc.id,
          ...doc.data()
        });
      });

      dispatch(receiveQuizzes(quizzes));
    }
  }, [docs, dispatch]);

  return { isFetching, quizIds, fetchMore };
};

export default useListenQuizzes;
