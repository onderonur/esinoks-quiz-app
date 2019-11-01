import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { deleteQuestionConfirmed, deleteQuestionCancelled } from "actions";
import BaseDialog from "components/BaseDialog";

const DeleteQuestionConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, quizId, questionId } = useSelector(state =>
    selectors.selectDeleteQuestionConfirmationDialogProps(state)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingDeleteQuestion(state)
  );

  const handleClose = useCallback(() => {
    dispatch(deleteQuestionCancelled());
  }, [dispatch]);

  return (
    <BaseDialog
      isOpen={isOpen}
      loading={isFetching}
      title="Soruyu Sil?"
      content="Bu soruyu silmek istediğinize emin misiniz?"
      confirmText="Sil"
      onConfirm={() => {
        dispatch(deleteQuestionConfirmed(quizId, questionId));
      }}
      onClose={handleClose}
    />
  );
};

export default DeleteQuestionConfirmationDialog;
