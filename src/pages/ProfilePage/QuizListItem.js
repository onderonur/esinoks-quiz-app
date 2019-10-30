import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BaseMenu from "components/BaseMenu";
import RouterLink from "components/RouterLink";
import { deleteQuiz } from "actions";

const QuizListItem = ({ quizId, index }) => {
  const dispatch = useDispatch();
  const quiz = useSelector(state => selectors.selectQuizById(state, quizId));

  return (
    <ListItem
      key={quiz.id}
      button
      to={`/quiz/${quizId}`}
      component={RouterLink}
    >
      <ListItemText primary={`${index + 1}. ${quiz.title}`} />
      <ListItemSecondaryAction>
        <BaseMenu
          renderTrigger={({ onClick }) => (
            <IconButton onClick={onClick}>
              <MoreVertIcon />
            </IconButton>
          )}
          menuItems={[
            {
              key: "edit",
              title: "Düzenle",
              to: `/profile/quiz/${quizId}`,
              component: RouterLink
            },
            {
              key: "delete",
              title: "Sil",
              onClick: () => dispatch(deleteQuiz(quizId))
            }
          ]}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuizListItem;
