import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import BaseButton from "./BaseButton";

const ConfirmationDialog = ({
  isOpen,
  title,
  content,
  confirmText = "Tamam",
  cancelText = "İptal",
  onConfirm,
  onCancel,
  loading
}) => {
  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onCancel}>
          {cancelText}
        </Button>
        <BaseButton color="primary" loading={loading} onClick={onConfirm}>
          {confirmText}
        </BaseButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
