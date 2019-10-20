import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { restartQuizCancelled, restartQuizConfirmed } from "actions";
import ConfirmationDialog from "./ConfirmationDialog";
import { selectors } from "reducers";

const RestartQuizConfirmationDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state =>
    selectors.selectIsOpenRestartQuizConfirmation(state)
  );

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      title="Quiz'i Tekrarla?"
      content="Quiz en baştan başlatılacaktır."
      confirmText="Tekrarla"
      onConfirm={() => dispatch(restartQuizConfirmed())}
      onCancel={() => dispatch(restartQuizCancelled())}
    />
  );
};

export default RestartQuizConfirmationDialog;
