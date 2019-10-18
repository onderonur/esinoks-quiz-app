import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IconButton,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { restartQuiz } from "actions";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.grey[100]
  }
}));

const RestartQuizButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleRestartConfirmed = () => {
    closeConfirmation();
    dispatch(restartQuiz());
  };

  return (
    <>
      <IconButton className={classes.button} onClick={openConfirmation}>
        <ReplayIcon />
      </IconButton>
      <Dialog open={isConfirmationOpen} onClose={closeConfirmation} fullWidth>
        <DialogTitle>Quiz'i Tekrarla?</DialogTitle>
        <DialogContent dividers>Quiz en baştan başlatılacaktır.</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation} color="primary">
            İptal
          </Button>
          <Button onClick={handleRestartConfirmed} color="primary">
            Tekrarla
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestartQuizButton;
