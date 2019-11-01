import { useEffect, useState } from "react";
import useFirebase from "hooks/useFirebase";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveQuizzes } from "actions";

const useListenAuthUserQuizzes = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const authUser = useSelectAuthUser();
  const [isFetching, setIsFetching] = useState(true);
  const authUserQuizIds = useSelector(state =>
    selectors.selectAuthUserQuizIds(state)
  );

  useEffect(() => {
    const listener = firebase
      .quizzes()
      .where("authorId", "==", authUser.uid)
      .onSnapshot(querySnapshot => {
        const quizzes = [];
        querySnapshot.forEach(doc => {
          quizzes.push({
            id: doc.id,
            ...doc.data()
          });
        });

        dispatch(receiveQuizzes(quizzes));
        setIsFetching(false);
      });

    return () => listener();
  }, [firebase, dispatch, authUser]);

  return { isFetching, authUserQuizIds };
};

export default useListenAuthUserQuizzes;
