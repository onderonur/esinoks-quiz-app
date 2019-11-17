import React, { useEffect } from "react";
import QuizQuestionGridList from "./QuizQuestionGridList";
import ActiveQuestionDialog from "./ActiveQuestionDialog";
import Journey from "./Journey";
import { useParams, Prompt } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import { useSelector, useDispatch } from "react-redux";
import { exitedFromQuiz, fetchQuiz } from "actions";
import { Typography, makeStyles } from "@material-ui/core";
import { selectors } from "reducers";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.common.white
  }
}));

const QuizPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { quizId } = useParams();
  const quiz = useSelector(state => selectors.selectQuiz(state, quizId));
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingQuiz(state, quizId)
  );

  useEffect(() => {
    dispatch(fetchQuiz.base(quizId, history));
  }, [dispatch, history, quizId]);

  useEffect(() => {
    // When user leaves this page, we clean the quiz state from the store.
    // Otherwise, when the user leaves the quiz and re-enters this page,
    // the previous answers would still be in the store.
    return () => {
      dispatch(exitedFromQuiz());
    };
  }, [dispatch]);

  return isFetching || !quiz ? (
    <LoadingIndicator loading />
  ) : (
    <>
      <Prompt
        when={true}
        message="Sayfadan çıktığınızda verdiğiniz cevaplar silinecektir. Devam etmek istediğinize emin misiniz?"
      />
      <Journey />
      <Typography className={classes.title} variant="h5">
        {quiz.title}
      </Typography>
      <QuizQuestionGridList />
      <ActiveQuestionDialog />
    </>
  );
};

export default QuizPage;
