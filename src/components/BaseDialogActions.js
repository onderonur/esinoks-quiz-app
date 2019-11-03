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
  confirmButtonProps: {
    type: confirmButtonType,
    disabled: confirmButtonDisabled,
    ...confirmButtonRest
  } = {}
}) => {
  const close = useBaseDialogContext();

  return (
    <DialogActions>
      <BaseButton disabled={loading || disabled} onClick={close}>
        {cancelText}
      </BaseButton>
      <BaseButton
        type={confirmButtonType}
        color="primary"
        disabled={disabled || confirmButtonDisabled}
        loading={loading}
        // If there is no "onConfirm" or "type" prop, we close the dialog by default.
        onClick={onConfirm || confirmButtonType ? undefined : close}
        {...confirmButtonRest}
      >
        {confirmText}
      </BaseButton>
    </DialogActions>
  );
};

export default BaseDialogActions;
