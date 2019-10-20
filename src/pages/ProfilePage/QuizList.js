import React, { useEffect, useState } from "react";
import useFirebase from "hooks/useFirebase";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import BaseList from "components/BaseList";
import QuizListItem from "./QuizListItem";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveOwnQuizzes } from "actions";

const QuizList = () => {
  const firebase = useFirebase();
  const authUser = useSelectAuthUser();
  const [isFetching, setIsFetching] = useState();
  const ownQuizIds = useSelector(state => selectors.selectOwnQuizIds(state));
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetching(true);

    firebase
      .quizzes()
      .where("authorId", "==", authUser.uid)
      .onSnapshot(querySnapshot => {
        var ownQuizzes = [];
        querySnapshot.forEach(doc => {
          ownQuizzes.push({
            id: doc.id,
            ...doc.data()
          });
        });
        console.log(ownQuizzes);
        dispatch(receiveOwnQuizzes(ownQuizzes));
        setIsFetching(false);
      });

    // TODO: Remove listener
  }, [firebase, dispatch, authUser]);

  return (
    <BaseList
      loading={isFetching}
      data={ownQuizIds}
      renderItem={quizId => <QuizListItem key={quizId} quizId={quizId} />}
    />
  );
};

export default QuizList;
