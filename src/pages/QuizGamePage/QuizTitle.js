import React from "react";
import { useSelector } from "react-redux";
import { Typography, makeStyles, Box } from "@material-ui/core";
import { selectors } from "reducers";
import RestartQuizButton from "components/RestartQuizButton";
import Hearts from "./Hearts";

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.common.white,
    flex: 1
  }
}));

const QuizTitle = ({ quizId }) => {
  const classes = useStyles();
  const quiz = useSelector(state => selectors.selectQuiz(state, quizId));

  return (
    <Box display="flex" alignItems="center">
      <Typography className={classes.title} variant="h5" noWrap>
        {quiz.title}
      </Typography>
      <Hearts quizId={quizId} />
      <RestartQuizButton quizId={quizId} />
    </Box>
  );
};

export default QuizTitle;
