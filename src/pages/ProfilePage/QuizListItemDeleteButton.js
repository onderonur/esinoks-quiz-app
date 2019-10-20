import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteQuiz } from "actions";
import { useDispatch } from "react-redux";

const QuizListItemDeleteButton = ({ quizId }) => {
  const dispatch = useDispatch();

  return (
    <IconButton color="secondary" onClick={() => dispatch(deleteQuiz(quizId))}>
      <DeleteIcon />
    </IconButton>
  );
};

export default QuizListItemDeleteButton;
