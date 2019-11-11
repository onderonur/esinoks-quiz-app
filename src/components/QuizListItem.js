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

const QuizListItem = ({ quizId, index, hasActions }) => {
  const quiz = useSelector(state => selectors.selectQuizById(state, quizId));

  return (
    <ListItem
      key={quiz.id}
      button
      to={`/quiz/${quizId}`}
      component={RouterLink}
    >
      <ListItemText primary={`${index + 1}. ${quiz.title}`} />
      {hasActions && (
        <ListItemSecondaryAction>
          <QuizListItemMenu quizId={quizId} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default QuizListItem;
