import { useEffect, useCallback } from "react";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveQuizzes } from "actions";
import useFirebaseListener from "./useFirebaseListener";

const useListenAuthUserQuizzes = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelectAuthUser();
  const authUserQuizIds = useSelector(state =>
    selectors.selectAuthUserQuizIds(state)
  );

  const query = useCallback(
    firebase => {
      return firebase
        .quizzes()
        .where("authorId", "==", authUser.uid)
        .orderBy("createdAt");
    },
    [authUser.uid]
  );

  const { isFetching, snapshot } = useFirebaseListener({ query });

  useEffect(() => {
    if (snapshot) {
      const quizzes = [];
      snapshot.forEach(doc => {
        quizzes.push({
          id: doc.id,
          ...doc.data()
        });
      });

      dispatch(receiveQuizzes(quizzes));
    }
  }, [dispatch, snapshot]);

  return { isFetching, authUserQuizIds };
};

export default useListenAuthUserQuizzes;
