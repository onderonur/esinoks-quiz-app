import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { deleteQuestionConfirmed, deleteQuestionCancelled } from "actions";
import ConfirmationDialog from "components/ConfirmationDialog";

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
    <ConfirmationDialog
      isOpen={isOpen}
      loading={isFetching}
      title="Soruyu Sil?"
      message="Bu soruyu silmek istediğinize emin misiniz?"
      confirmText="Sil"
      onConfirm={() => {
        dispatch(deleteQuestionConfirmed(quizId, questionId));
      }}
      onExited={handleClose}
    />
  );
};

export default DeleteQuestionConfirmationDialog;
