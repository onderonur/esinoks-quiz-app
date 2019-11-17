import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { deleteQuiz } from "actions";
import ConfirmationDialog from "components/ConfirmationDialog";

const DeleteQuizConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, quizId } = useSelector(state =>
    selectors.selectDeleteQuizConfirmationDialogProps(state)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingDeleteQuiz(state)
  );

  const quiz = useSelector(state => selectors.selectQuiz(state, quizId));

  const handleExited = useCallback(() => {
    dispatch(deleteQuiz.cancelled());
  }, [dispatch]);

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      loading={isFetching}
      title="Quiz'i Sil?"
      message={
        quiz
          ? `"${quiz.title}" isimli quiz ve tüm soruları silinecektir.`
          : "Lütfen bekleyin..."
      }
      confirmText="Sil"
      onConfirm={() => {
        dispatch(deleteQuiz.confirmed(quizId));
      }}
      onExited={handleExited}
    />
  );
};

export default DeleteQuizConfirmationDialog;
