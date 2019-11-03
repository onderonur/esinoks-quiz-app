import React from "react";
import BaseDialog from "./BaseDialog";
import { DialogContentText } from "@material-ui/core";
import BaseDialogActions from "./BaseDialogActions";
import BaseDialogTitle from "./BaseDialogTitle";
import BaseDialogContent from "./BaseDialogContent";

const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  loading,
  confirmText = "Tamam",
  cancelText = "İptal",
  onConfirm,
  onExited
}) => {
  return (
    <BaseDialog isOpen={isOpen} onExited={onExited}>
      <BaseDialogTitle title={title} hideCloseButton />
      <BaseDialogContent dividers={false}>
        <DialogContentText>{message}</DialogContentText>
      </BaseDialogContent>
      <BaseDialogActions
        loading={loading}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={onConfirm}
      />
    </BaseDialog>
  );
};

export default ConfirmationDialog;
