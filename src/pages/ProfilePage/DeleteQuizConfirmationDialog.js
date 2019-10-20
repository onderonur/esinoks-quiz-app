import React from "react";
import ConfirmationDialog from "components/ConfirmationDialog";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { deleteQuizConfirmed, deleteQuizCancelled } from "actions";

const DeleteQuizConfirmationDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state =>
    selectors.selectIsOpenDeleteQuizConfirmation(state)
  );
  const dialogProps = useSelector(state =>
    selectors.selectDeleteQuizConfirmationDialogProps(state)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingDeleteQuiz(state)
  );

  const { quizId } = dialogProps;
  const quiz = useSelector(state => selectors.selectOwnQuizById(state, quizId));

  return (
    <ConfirmationDialog
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
      onCancel={() => dispatch(deleteQuizCancelled())}
    />
  );
};

export default DeleteQuizConfirmationDialog;
