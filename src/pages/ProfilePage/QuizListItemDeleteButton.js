import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "components/ConfirmationDialog";
import useDialogToggle from "hooks/useDialogToggle";
import useFirebase from "hooks/useFirebase";

const QuizListItemDeleteButton = ({ quiz }) => {
  const [isOpen, { openDialog, closeDialog }] = useDialogToggle();
  const firebase = useFirebase();

  // TODO: isFething ekle
  return (
    <>
      <IconButton color="secondary" onClick={openDialog}>
        <DeleteIcon />
      </IconButton>
      <ConfirmationDialog
        isOpen={isOpen}
        title="Quiz'i Sil?"
        content={`"${quiz.title}" isimli quiz ve tüm soruları silinecektir.`}
        confirmText="Sil"
        onConfirm={async () => {
          await firebase.quiz(quiz.id).delete();
          closeDialog();
        }}
        onCancel={closeDialog}
      />
    </>
  );
};

export default QuizListItemDeleteButton;
