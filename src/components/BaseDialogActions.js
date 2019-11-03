import React from "react";
import { DialogActions } from "@material-ui/core";
import BaseButton from "./BaseButton";
import useBaseDialogContext from "hooks/useBaseDialogContext";

const BaseDialogActions = ({
  confirmText = "Tamam",
  cancelText = "İptal",
  onConfirm,
  loading,
  disabled,
  confirmButtonProps
}) => {
  const close = useBaseDialogContext();

  return (
    <DialogActions>
      <BaseButton disabled={loading || disabled} onClick={close}>
        {cancelText}
      </BaseButton>
      <BaseButton
        color="primary"
        disabled={disabled}
        loading={loading}
        onClick={onConfirm}
        {...confirmButtonProps}
      >
        {confirmText}
      </BaseButton>
    </DialogActions>
  );
};

export default BaseDialogActions;
