import React from "react";
import { useDispatch } from "react-redux";
import { openQuestionFormDialog, deleteQuestion } from "actions";
import BaseMenu from "components/BaseMenu";

const QuizQuestionListItemMenu = ({ renderTrigger, quizId, questionId }) => {
  const dispatch = useDispatch();

  return (
    <BaseMenu
      renderTrigger={renderTrigger}
      menuItems={[
        {
          key: "edit",
          title: "Düzenle",
          onClick: () => dispatch(openQuestionFormDialog(quizId, questionId))
        },
        {
          key: "delete",
          title: "Sil",
          onClick: () => dispatch(deleteQuestion.base(quizId, questionId))
        }
      ]}
    />
  );
};

export default QuizQuestionListItemMenu;
