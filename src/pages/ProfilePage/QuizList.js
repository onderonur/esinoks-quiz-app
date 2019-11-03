import React from "react";
import BaseList from "components/BaseList";
import QuizListItem from "./QuizListItem";
import DeleteQuizConfirmationDialog from "./DeleteQuizConfirmationDialog";
import { Box, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import useListenAuthUserQuizzes from "hooks/useListenAuthUserQuizzes";
import ShareQuizCodeDialog from "./ShareQuizCodeDialog";

const renderItem = (quizId, index) => (
  <QuizListItem key={quizId} quizId={quizId} index={index} />
);

const QuizList = () => {
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
      <BaseList
        loading={isFetching}
        data={authUserQuizIds}
        renderItem={renderItem}
      />
      <ShareQuizCodeDialog />
      <DeleteQuizConfirmationDialog />
    </>
  );
};

export default QuizList;
