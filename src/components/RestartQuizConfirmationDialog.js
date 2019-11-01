import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { restartQuizCancelled, restartQuizConfirmed } from "actions";
import { selectors } from "reducers";
import BaseDialog from "./BaseDialog";

const RestartQuizConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state =>
    selectors.selectRestartQuizConfirmationDialogProps(state)
  );

  const handleClose = useCallback(() => {
    dispatch(restartQuizCancelled());
  }, [dispatch]);

  return (
    <BaseDialog
      isOpen={isOpen}
      title="Quiz'i Tekrarla?"
      content="Quiz en baştan başlatılacaktır."
      confirmText="Tekrarla"
      onConfirm={() => dispatch(restartQuizConfirmed())}
      onClose={handleClose}
    />
  );
};

export default RestartQuizConfirmationDialog;
