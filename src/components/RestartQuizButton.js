import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, makeStyles } from "@material-ui/core";
import { restartQuiz } from "actions";
import ReplayIcon from "@material-ui/icons/Replay";
import RestartQuizConfirmationDialog from "./RestartQuizConfirmationDialog";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.grey[100]
  }
}));

const RestartQuizButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        className={classes.button}
        onClick={() => dispatch(restartQuiz())}
      >
        <ReplayIcon />
      </IconButton>
      <RestartQuizConfirmationDialog />
    </>
  );
};

export default RestartQuizButton;
