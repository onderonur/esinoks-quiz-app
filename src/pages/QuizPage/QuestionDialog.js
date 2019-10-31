import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { selectQuestion, answerQuestion } from "actions";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import BaseButton from "components/BaseButton";
import QuestionDialogChoiceList from "./QuestionDialogChoiceList";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import RawHtmlDiv from "components/RawHtmlDiv";

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(1, 2)
  },
  closeButton: {
    color: theme.palette.grey[500]
  }
}));

const validationSchema = Yup.object().shape({
  givenAnswer: Yup.number().required()
});

const QuestionDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const question = useSelector(state => selectors.selectActiveQuestion(state));
  const [isOpen, setIsOpen] = useState(!!question);

  const questionIndex = useSelector(state =>
    question ? selectors.selectQuestionIndexById(state, question.id) : null
  );

  const givenAnswer = useSelector(state =>
    question
      ? selectors.selectGivenAnswerByQuestionId(state, question.id)
      : undefined
  );

  const choices = question ? question.choices : [];

  const isQuestionSelected = !!question;

  useEffect(() => {
    setIsOpen(isQuestionSelected);
  }, [isQuestionSelected]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const initialValues = {
    givenAnswer
  };

  const didAnswered = givenAnswer !== undefined;

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
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={values => {
          const { givenAnswer } = values;
          dispatch(answerQuestion(question.id, givenAnswer));
        }}
      >
        {({ isValid }) => {
          return (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flex: 1
              }}
            >
              <DialogContent dividers>
                <RawHtmlDiv html={question.body} />
                <QuestionDialogChoiceList
                  name="givenAnswer"
                  choices={choices}
                  disabled={didAnswered}
                />
              </DialogContent>
              <DialogActions>
                <BaseButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!isValid || didAnswered}
                >
                  Cevapla
                </BaseButton>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  ) : null;
};

export default QuestionDialog;
