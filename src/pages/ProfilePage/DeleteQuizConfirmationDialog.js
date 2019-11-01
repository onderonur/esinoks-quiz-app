import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { deleteQuizConfirmed, deleteQuizCancelled } from "actions";
import BaseDialog from "components/BaseDialog";

const DeleteQuizConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, quizId } = useSelector(state =>
    selectors.selectDeleteQuizConfirmationDialogProps(state)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingDeleteQuiz(state)
  );

  const quiz = useSelector(state => selectors.selectQuizById(state, quizId));

  const handleClose = useCallback(() => {
    dispatch(deleteQuizCancelled());
  }, [dispatch]);

  return (
    <BaseDialog
      isOpen={isOpen}
      loading={isFetching}
      title="Quiz'i Sil?"
      content={
        quiz
          ? `"${quiz.title}" isimli quiz ve tüm soruları silinecektir.`
          : "Lütfen bekleyin..."
      }
      confirmText="Sil"
      onConfirm={() => {
        dispatch(deleteQuizConfirmed(quizId));
      }}
      onClose={handleClose}
    />
  );
};

export default DeleteQuizConfirmationDialog;
