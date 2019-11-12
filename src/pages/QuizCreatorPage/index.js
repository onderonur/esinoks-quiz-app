import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { openQuestionFormDialog } from "actions";
import LoadingIndicator from "components/LoadingIndicator";
import { selectors } from "reducers";
import useFetchQuiz from "hooks/useFetchQuiz";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const QuizCreatorPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const quiz = useSelector(state => selectors.selectQuizById(state, quizId));
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingQuiz(state, quizId)
  );

  useFetchQuiz(quizId);

  return (
    <>
      <Paper className={classes.paper}>
        <LoadingIndicator loading={isFetching}>
          <QuizForm />
          {quiz && (
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
