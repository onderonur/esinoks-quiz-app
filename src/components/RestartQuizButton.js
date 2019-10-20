import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, makeStyles } from "@material-ui/core";
import { restartQuiz } from "actions";
import ReplayIcon from "@material-ui/icons/Replay";
import ConfirmationDialog from "./ConfirmationDialog";
import useDialogToggle from "hooks/useDialogToggle";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.grey[100]
  }
}));

const RestartQuizButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isConfirmationOpen, { openDialog, closeDialog }] = useDialogToggle();

  const handleRestartConfirmed = () => {
    closeDialog();
    dispatch(restartQuiz());
  };

  return (
    <>
      <IconButton className={classes.button} onClick={openDialog}>
        <ReplayIcon />
      </IconButton>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        title="Quiz'i Tekrarla?"
        content="Quiz en baştan başlatılacaktır."
        confirmText="Tekrarla"
        onConfirm={handleRestartConfirmed}
        onCancel={closeDialog}
      />
    </>
  );
};

export default RestartQuizButton;
