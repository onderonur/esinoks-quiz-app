import React from "react";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BaseMenu from "components/BaseMenu";
import RouterLink from "components/RouterLink";
import { deleteQuiz, shareQuizCode } from "actions";

const QuizListItemMenu = ({ quizId }) => {
  const dispatch = useDispatch();

  return (
    <BaseMenu
      renderTrigger={({ onClick }) => (
        <IconButton onClick={onClick}>
          <MoreVertIcon />
        </IconButton>
      )}
      menuItems={[
        {
          key: "share",
          title: "Paylaş",
          onClick: () => dispatch(shareQuizCode.base(quizId))
        },
        {
          key: "edit",
          title: "Düzenle",
          to: `/profile/quiz/${quizId}`,
          component: RouterLink
        },
        {
          key: "delete",
          title: "Sil",
          onClick: () => dispatch(deleteQuiz.base(quizId))
        }
      ]}
    />
  );
};

export default QuizListItemMenu;
