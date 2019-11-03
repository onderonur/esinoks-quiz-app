import React, { useEffect } from "react";
import QuestionGridList from "./QuestionGridList";
import QuestionDialog from "./QuestionDialog";
import Journey from "./Journey";
import { useParams, Prompt } from "react-router-dom";
import useListenQuiz from "hooks/useListenQuiz";
import LoadingIndicator from "components/LoadingIndicator";
import { useDispatch } from "react-redux";
import { exitedFromQuiz } from "actions";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.common.white
  }
}));

const QuizPage = () => {
  const { quizId } = useParams();
  const { isFetching, quiz } = useListenQuiz(quizId);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // When user leaves this page, we clean the quiz state from the store.
    // Otherwise, when the user leaves the quiz and re-enters this page,
    // the previous answers would still be in the store.
    return () => {
      dispatch(exitedFromQuiz());
    };
  }, [dispatch]);

  return quiz ? (
    <LoadingIndicator loading={isFetching}>
      <Prompt
        when={true}
        message="Sayfadan çıktığınızda verdiğiniz cevaplar silinecektir. Devam etmek istediğinize emin misiniz?"
      />
      <Journey />
      <Typography className={classes.title} variant="h5">
        {quiz.title}
      </Typography>
      <QuestionGridList />
      <QuestionDialog />
    </LoadingIndicator>
  ) : null;
};

export default QuizPage;
