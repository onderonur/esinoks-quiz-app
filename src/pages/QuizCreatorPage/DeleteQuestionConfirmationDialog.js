import React from "react";
import ConfirmationDialog from "components/ConfirmationDialog";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { deleteQuestionConfirmed, deleteQuestionCancelled } from "actions";

const DeleteQuestionConfirmationDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state =>
    selectors.selectIsOpenDeleteQuiestionConfirmation(state)
  );
  const dialogProps = useSelector(state =>
    selectors.selectDeleteQuestionConfirmationDialogProps(state)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingDeleteQuestion(state)
  );

  const { quizId, questionId } = dialogProps;

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      loading={isFetching}
      title="Soruyu Sil?"
      content="Bu soruyu silmek istediğinize emin misiniz?"
      confirmText="Sil"
      onConfirm={() => {
        dispatch(deleteQuestionConfirmed(quizId, questionId));
      }}
      onCancel={() => dispatch(deleteQuestionCancelled())}
    />
  );
};

export default DeleteQuestionConfirmationDialog;
