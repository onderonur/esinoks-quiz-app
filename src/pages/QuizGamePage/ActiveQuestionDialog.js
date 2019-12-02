import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { answerQuestion, selectQuestion } from "actions";
import ActiveQuestionDialogChoiceList from "./ActiveQuestionDialogChoiceList";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import SanitizedHtml from "components/SanitizedHtml";
import { Paper, Typography, Box, makeStyles } from "@material-ui/core";
import BaseButton from "components/BaseButton";
import BaseForm from "components/BaseForm";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  actions: {
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1)
    }
  }
}));

const validationSchema = Yup.object().shape({
  givenAnswer: Yup.number().required()
});

const ActiveQuestionDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { quizId } = useParams();

  const quizQuestionIds = useSelector(state =>
    selectors.selectQuizQuestionIds(state, quizId)
  );

  const activeQuestion = useSelector(state =>
    selectors.selectActiveQuestion(state)
  );

  useEffect(() => {
    if (!activeQuestion && quizQuestionIds.length) {
      const firstQuestionId = quizQuestionIds[0];
      dispatch(selectQuestion(firstQuestionId));
    }
  }, [dispatch, quizQuestionIds, activeQuestion]);

  const questionIndex = useSelector(state =>
    activeQuestion
      ? selectors.selectQuizQuestionIndex(state, quizId, activeQuestion.id)
      : null
  );

  const givenAnswer = useSelector(state =>
    activeQuestion
      ? selectors.selectGivenAnswer(state, quizId, activeQuestion.id)
      : null
  );

  const choices = activeQuestion ? activeQuestion.choices : [];

  const initialValues = {
    givenAnswer
  };

  const didAnswered = givenAnswer !== undefined;

  return activeQuestion ? (
    <Paper className={classes.paper} square>
      <Typography variant="h6">{`Soru ${questionIndex + 1}`}</Typography>
      <Box>
        <BaseForm
          // We used the "key" prop to create a new "Formik" on each active question change.
          // Otherwise, if a question choice is checked and than another question is selected as "active",
          // the index of previous selected choice is checked on the new active question.
          key={activeQuestion.id}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            const { givenAnswer } = values;
            dispatch(answerQuestion(quizId, activeQuestion.id, givenAnswer));
          }}
        >
          {({ isValid }) => {
            return (
              <>
                <SanitizedHtml html={activeQuestion.body} />
                <ActiveQuestionDialogChoiceList
                  name="givenAnswer"
                  choices={choices}
                  disabled={didAnswered}
                />
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  className={classes.actions}
                >
                  <BaseButton
                    type="submit"
                    color="primary"
                    size="small"
                    variant="contained"
                    disabled={didAnswered || !isValid}
                  >
                    Cevapla
                  </BaseButton>
                </Box>
              </>
            );
          }}
        </BaseForm>
      </Box>
    </Paper>
  ) : null;
};

export default ActiveQuestionDialog;
