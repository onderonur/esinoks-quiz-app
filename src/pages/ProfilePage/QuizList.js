import React, { useEffect, useState } from "react";
import useFirebase from "hooks/useFirebase";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import BaseList from "components/BaseList";
import QuizListItem from "./QuizListItem";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveQuizzes } from "actions";
import DeleteQuizConfirmationDialog from "./DeleteQuizConfirmationDialog";
import { Box, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const QuizList = () => {
  const history = useHistory();
  const firebase = useFirebase();
  const authUser = useSelectAuthUser();
  const [isFetching, setIsFetching] = useState(true);
  const authUserQuizIds = useSelector(state =>
    selectors.selectAuthUserQuizIds(state)
  );
  const dispatch = useDispatch();

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

    // TODO: Check if this is the right way to remove firestore listeners
    return () => listener();
  }, [firebase, dispatch, authUser]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Quiz'lerim</Typography>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push("/profile/quiz/new")}
        >
          Yeni Quiz
        </Button>
      </Box>
      <BaseList
        loading={isFetching}
        data={authUserQuizIds}
        renderItem={(quizId, index) => (
          <QuizListItem key={quizId} quizId={quizId} index={index} />
        )}
      />
      <DeleteQuizConfirmationDialog />
    </>
  );
};

export default QuizList;
