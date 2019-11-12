import React, { useEffect } from "react";
import DeleteQuizConfirmationDialog from "./DeleteQuizConfirmationDialog";
import { Box, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import ShareQuizCodeDialog from "./ShareQuizCodeDialog";
import QuizList from "./QuizList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUserQuizzes } from "actions";
import { selectors } from "reducers";

const ProfileQuizList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authUserQuizIds = useSelector(state =>
    selectors.selectAuthUserQuizIds(state)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAuthUserQuizzes(state)
  );

  useEffect(() => {
    dispatch(fetchAuthUserQuizzes());
  }, [dispatch]);

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
      <QuizList quizIds={authUserQuizIds} isFetching={isFetching} />
      <ShareQuizCodeDialog />
      <DeleteQuizConfirmationDialog />
    </>
  );
};

export default ProfileQuizList;
