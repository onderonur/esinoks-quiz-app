import React from "react";
import DeleteQuizConfirmationDialog from "./DeleteQuizConfirmationDialog";
import { Box, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import useListenAuthUserQuizzes from "hooks/useListenAuthUserQuizzes";
import ShareQuizCodeDialog from "./ShareQuizCodeDialog";
import QuizList from "components/QuizList";

const ProfileQuizList = () => {
  const history = useHistory();

  const { isFetching, authUserQuizIds } = useListenAuthUserQuizzes();

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
      <QuizList quizIds={authUserQuizIds} isFetching={isFetching} hasActions />
      <ShareQuizCodeDialog />
      <DeleteQuizConfirmationDialog />
    </>
  );
};

export default ProfileQuizList;
