import React from "react";
import { useDispatch } from "react-redux";
import { openQuestionFormDialog, deleteQuestion } from "actions";
import BaseMenu from "components/BaseMenu";
import useConfirmDialog from "hooks/useConfirmDialog";

const QuizQuestionListItemMenu = ({ renderTrigger, quizId, questionId }) => {
  const dispatch = useDispatch();
  const confirm = useConfirmDialog();

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
          onClick: () => {
            confirm({
              title: "Soruyu Sil?",
              description: "Bu soruyu silmek istediğinize emin misiniz?",
              confirmText: "Sil",
              onConfirm: () => dispatch(deleteQuestion(quizId, questionId))
            });
          }
        }
      ]}
    />
  );
};

export default QuizQuestionListItemMenu;
