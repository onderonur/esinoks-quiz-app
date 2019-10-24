import React, { useEffect, useState } from "react";
import {
  Paper,
  makeStyles,
  Divider,
  Typography,
  Box,
  Button
} from "@material-ui/core";
import QuizForm from "./QuizForm";
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import QuestionFormDialog from "./QuestionFormDialog";
import QuizQuestionList from "./QuizQuestionList";
import { useDispatch } from "react-redux";
import useFirebase from "hooks/useFirebase";
import { receiveQuiz, openQuestionFormDialog } from "actions";
import LoadingIndicator from "components/LoadingIndicator";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const QuizCreatorPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const { quizId } = useParams();

  const isNew = quizId === "new";
  const [isFetching, setIsFetching] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      const listener = firebase.quiz(quizId).onSnapshot(quizDoc => {
        dispatch(receiveQuiz(quizDoc));
        setIsFetching(false);
      });

      return () => listener();
    }
  }, [firebase, dispatch, quizId, isNew]);

  return (
    <>
      <Paper className={classes.paper}>
        <LoadingIndicator loading={isFetching}>
          <QuizForm />
          {!isNew && (
            <>
              <Box marginY={2}>
                <Divider />
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Sorular</Typography>
                <Button
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    dispatch(openQuestionFormDialog(quizId, "new"))
                  }
                >
                  Yeni Soru
                </Button>
              </Box>
              <QuizQuestionList quizId={quizId} />
            </>
          )}
        </LoadingIndicator>
      </Paper>

      <QuestionFormDialog />
    </>
  );
};

export default QuizCreatorPage;
