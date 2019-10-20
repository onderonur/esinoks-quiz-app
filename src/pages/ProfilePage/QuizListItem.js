import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import QuizListItemDeleteButton from "./QuizListItemDeleteButton";
import { useHistory } from "react-router-dom";

const QuizListItem = ({ quizId }) => {
  const history = useHistory();
  const quiz = useSelector(state => selectors.selectOwnQuizById(state, quizId));

  return (
    <ListItem
      key={quiz.id}
      button
      onClick={() => history.push(`/profile/quiz/${quizId}`)}
    >
      <ListItemText primary={quiz.title} />
      <ListItemSecondaryAction>
        <QuizListItemDeleteButton quizId={quizId} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuizListItem;
