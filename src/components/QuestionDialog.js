import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  IconButton,
  Box
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { answerQuestion, selectQuestion } from "actions";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import BaseButton from "./BaseButton";
import QuestionDialogChoiceList from "./QuestionDialogChoiceList";

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(1, 2)
  },
  closeButton: {
    color: theme.palette.grey[500]
  }
}));

const QuestionDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAnswer(state)
  );

  const question = useSelector(state => selectors.selectActiveQuestion(state));
  const [isOpen, setIsOpen] = useState(!!question);
  const answerId = useSelector(state =>
    question ? selectors.selectAnswerIdByQuestionId(state, question.id) : null
  );
  const selectedChoiceId = useSelector(state =>
    question ? selectors.selectChoiceIdByQuestionId(state, question.id) : null
  );

  const questionIndex = useSelector(state =>
    question ? selectors.selectQuestionIndexById(state, question.id) : null
  );

  const choices = question ? question.choices : [];
  const selectedChoice = choices.find(choice => choice.id === selectedChoiceId);

  const isQuestionSelected = !!question;

  useEffect(() => {
    setIsOpen(isQuestionSelected);
  }, [isQuestionSelected]);

  const handleClose = () => {
    // When we are fetching the answer, dialog can not be closed.
    if (!isFetching) {
      setIsOpen(false);
    }
  };

  return question ? (
    <Dialog
      open={isOpen}
      // Disabled the portal to show modal when the "fullscreen" mode for the application is activated.
      disablePortal
      fullWidth
      onClose={handleClose}
      // Wait for modal closing animation to end and set the selected question to null.
      onExited={() => dispatch(selectQuestion(null))}
    >
      <DialogTitle disableTypography className={classes.title}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Soru {questionIndex + 1}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText variant="h6">{question.text}</DialogContentText>
        <QuestionDialogChoiceList choices={choices} />
      </DialogContent>
      <DialogActions>
        <BaseButton
          color="primary"
          variant="contained"
          loading={isFetching}
          disabled={!selectedChoice || !!answerId}
          onClick={() =>
            dispatch(answerQuestion(question.id, selectedChoice.id))
          }
        >
          Cevapla
        </BaseButton>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default QuestionDialog;
