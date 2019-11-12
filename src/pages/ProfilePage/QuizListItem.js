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

const QuizListItem = ({ quizId, index }) => {
  const quiz = useSelector(state => selectors.selectQuizById(state, quizId));
  // const questionCount = useSelector(state =>
  //   selectors.selectTotalQuestionCountByQuizId(state, quizId)
  // );

  return (
    <ListItem
      key={quiz.id}
      button
      to={`/quiz/${quizId}`}
      component={RouterLink}
    >
      <ListItemText
        primary={`${index + 1}. ${quiz.title}`}
        // TODO: Bunun çalışması için quiz içerisinde toplam soru sayısını tutan bir alan tanımlanmalı firestore'da
        // secondary={`Toplam ${questionCount} Soru`}
      />
      <ListItemSecondaryAction>
        <QuizListItemMenu quizId={quizId} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuizListItem;
