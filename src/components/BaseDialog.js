import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import BaseButton from "./BaseButton";

const BaseDialog = ({
  isOpen,
  title,
  content,
  confirmText = "Tamam",
  cancelText = "İptal",
  onConfirm,
  onClose,
  loading
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // We used this way to wait dialog animation to end before calling "onClose" callback.
  // So rather than relying on the "isOpen" prop, we just use it as a secondary parameter.
  // The main flag that shows and hides the dialog is "isVisible" state.
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // When user redirects to another route, this clean up function will be executed.
  // So when he comes back to the previous page where this dialog is used, he will not see the
  // previously opened dialog.
  useEffect(() => {
    return () => onClose();
  }, [onClose]);

  return (
    <Dialog
      fullWidth
      open={isVisible}
      onClose={() => setIsVisible(false)}
      // We wait for the closing animation to end, then call the "onClose" callback.
      onExited={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={() => setIsVisible(false)}>
          {cancelText}
        </Button>
        <BaseButton color="primary" loading={loading} onClick={onConfirm}>
          {confirmText}
        </BaseButton>
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
