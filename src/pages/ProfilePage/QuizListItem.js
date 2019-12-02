import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import RouterLink from "components/RouterLink";
import QuizListItemMenu from "./QuizListItemMenu";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

const QuizListItem = ({ quizId, index }) => {
  const classes = useStyles();
  const quiz = useSelector(state => selectors.selectQuiz(state, quizId));
  const { isFetching: isDeletingQuiz } = useSelector(state =>
    selectors.selectAsyncInfoDeleteQuiz(state, quizId)
  );

  return (
    <LoadingIndicator loading={isDeletingQuiz} size={32}>
      <ListItem
        key={quiz.id}
        button
        to={`/quiz/${quizId}`}
        component={RouterLink}
      >
        <ListItemText
          className={classes.text}
          primary={`${index + 1}. ${quiz.title}`}
          primaryTypographyProps={{
            noWrap: true
          }}
          // TODO: May show the total question count as the secondary text later.
        />
        <ListItemSecondaryAction>
          <QuizListItemMenu quizId={quizId} />
        </ListItemSecondaryAction>
      </ListItem>
    </LoadingIndicator>
  );
};

export default QuizListItem;
