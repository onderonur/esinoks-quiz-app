import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { openQuizFormDialog } from "actions";
import { selectors } from "reducers";
import QuizListItemDeleteButton from "./QuizListItemDeleteButton";

const QuizListItem = ({ quizId }) => {
  const dispatch = useDispatch();
  const quiz = useSelector(state => selectors.selectOwnQuizById(state, quizId));

  return (
    <ListItem
      key={quiz.id}
      button
      onClick={() => dispatch(openQuizFormDialog(quizId))}
    >
      <ListItemText primary={quiz.title} />
      <ListItemSecondaryAction>
        <QuizListItemDeleteButton quiz={quiz} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuizListItem;
