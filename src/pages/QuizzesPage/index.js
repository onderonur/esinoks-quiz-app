import React, { useEffect } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import QuizList from "components/QuizList";
import BaseButton from "components/BaseButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzes, fetchMoreQuizzes } from "actions";
import { selectors } from "reducers";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const QuizzesPage = () => {
  const classes = useStyles();
  // const { isFetching, quizIds, fetchMore } = useListenQuizzes();
  const dispatch = useDispatch();
  const quizIds = useSelector(state => selectors.selectQuizIds(state));

  const isFetching = false;

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return isFetching ? (
    <LoadingIndicator loading />
  ) : (
    <Paper className={classes.paper}>
      <QuizList quizIds={quizIds} isFetching={isFetching} />
      <BaseButton onClick={() => dispatch(fetchMoreQuizzes())}>
        Daha Fazla
      </BaseButton>
    </Paper>
  );
};

export default QuizzesPage;
