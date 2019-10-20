import React, { useEffect, useState } from "react";
import useFirebase from "hooks/useFirebase";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import BaseList from "components/BaseList";
import QuizListItem from "./QuizListItem";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { receiveOwnQuizzes } from "actions";
import DeleteQuizConfirmationDialog from "./DeleteQuizConfirmationDialog";
import { Box, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const QuizList = () => {
  const history = useHistory();
  const firebase = useFirebase();
  const authUser = useSelectAuthUser();
  const [isFetching, setIsFetching] = useState();
  const ownQuizIds = useSelector(state => selectors.selectOwnQuizIds(state));
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFetching(true);

    const listener = firebase
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

        dispatch(receiveOwnQuizzes(ownQuizzes));
        setIsFetching(false);
      });

    // TODO: Check if this is the right way to remove firestore listeners
    return () => listener();
  }, [firebase, dispatch, authUser]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginY={2}
      >
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
        data={ownQuizIds}
        renderItem={quizId => <QuizListItem key={quizId} quizId={quizId} />}
      />
      <DeleteQuizConfirmationDialog />
    </>
  );
};

export default QuizList;
