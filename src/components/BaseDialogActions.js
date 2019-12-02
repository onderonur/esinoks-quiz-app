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
  children,
  hideCancel,
  confirmButtonProps: {
    type: confirmButtonType,
    disabled: confirmButtonDisabled,
    ...confirmButtonRest
  } = {}
}) => {
  const close = useBaseDialogContext();

  return (
    <DialogActions>
      {children ? (
        children({ close })
      ) : (
        <>
          {!hideCancel && (
            <BaseButton disabled={loading || disabled} onClick={close}>
              {cancelText}
            </BaseButton>
          )}
          <BaseButton
            type={confirmButtonType}
            color="primary"
            disabled={disabled || confirmButtonDisabled}
            loading={loading}
            onClick={onConfirm}
            {...confirmButtonRest}
          >
            {confirmText}
          </BaseButton>
        </>
      )}
    </DialogActions>
  );
};

export default BaseDialogActions;
