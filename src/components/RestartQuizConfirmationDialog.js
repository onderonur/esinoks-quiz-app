import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { restartQuizCancelled, restartQuizConfirmed } from "actions";
import { selectors } from "reducers";
import ConfirmationDialog from "./ConfirmationDialog";

const RestartQuizConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state =>
    selectors.selectRestartQuizConfirmationDialogProps(state)
  );

  const handleClose = useCallback(() => {
    dispatch(restartQuizCancelled());
  }, [dispatch]);

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      title="Quiz'i Tekrarla?"
      message="Quiz en baştan başlatılacaktır."
      confirmText="Tekrarla"
      onConfirm={() => dispatch(restartQuizConfirmed())}
      onExited={handleClose}
    />
  );
};

export default RestartQuizConfirmationDialog;
