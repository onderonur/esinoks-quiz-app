import React, { useCallback, useState } from "react";
import BaseDialog from "./BaseDialog";
import { DialogContentText } from "@material-ui/core";
import BaseDialogActions from "./BaseDialogActions";
import BaseDialogTitle from "./BaseDialogTitle";
import BaseDialogContent from "./BaseDialogContent";
import ConfirmDialogContext from "./ConfirmDialogContext";

const ConfirmDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState();

  const showConfirm = useCallback(newProps => {
    setIsOpen(Boolean(newProps));
    setProps(newProps);
  }, []);

  const {
    title,
    description,
    confirmText = "Tamam",
    cancelText = "İptal",
    onConfirm,
    hideCancel
  } = props || {};

  return (
    <>
      <ConfirmDialogContext.Provider value={showConfirm}>
        {children}
      </ConfirmDialogContext.Provider>
      <BaseDialog
        isOpen={isOpen}
        responsive={false}
        onClose={() => showConfirm(null)}
      >
        <BaseDialogTitle hideCloseButton>{title}</BaseDialogTitle>
        <BaseDialogContent dividers={false}>
          {typeof description === "string" ? (
            <DialogContentText>{description}</DialogContentText>
          ) : (
            description
          )}
        </BaseDialogContent>
        <BaseDialogActions
          confirmText={confirmText}
          cancelText={cancelText}
          hideCancel={hideCancel}
          onConfirm={() => {
            if (onConfirm) {
              onConfirm();
            }
            showConfirm(null);
          }}
        />
      </BaseDialog>
    </>
  );
};

export default ConfirmDialogProvider;
