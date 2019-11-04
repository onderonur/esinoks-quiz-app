import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, makeStyles } from "@material-ui/core";
import { restartQuiz } from "actions";
import ReplayIcon from "@material-ui/icons/Replay";
import RestartQuizConfirmationDialog from "./RestartQuizConfirmationDialog";
import { useRouteMatch } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.grey[100]
  }
}));

const RestartQuizButton = ({ className }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Restart button will be shown only while user is playing a quiz.
  // TODO: path' "/quiz/:quizId" şeklinde değiştir sonra
  const match = useRouteMatch({
    path: "/quiz"
  });

  return match ? (
    <>
      <IconButton
        className={clsx(classes.button, className)}
        onClick={() => dispatch(restartQuiz())}
      >
        <ReplayIcon />
      </IconButton>
      <RestartQuizConfirmationDialog />
    </>
  ) : null;
};

export default RestartQuizButton;
