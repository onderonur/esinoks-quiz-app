import React, { useEffect } from "react";
import { Dialog } from "@material-ui/core";
import useDetectMobile from "hooks/useDetectMobile";
import BaseDialogProvider from "./BaseDialogProvider";

const BaseDialog = ({
  isOpen,
  onClose,
  children,
  fullWidth = true,
  responsive = true,
  disableBackdropClick
}) => {
  const isMobile = useDetectMobile();

  // When user redirects to another route, this clean up function will be executed.
  // So when he comes back to the previous page where this dialog is used, he will not see the
  // previously opened dialog.
  // TODO: Needs some fix.
  useEffect(() => {
    if (isOpen) {
      return () => onClose();
    }
  }, [isOpen, onClose]);

  return (
    <Dialog
      fullWidth={fullWidth}
      open={isOpen}
      onClose={onClose}
      transitionDuration={0}
      fullScreen={responsive && isMobile}
      disableBackdropClick={disableBackdropClick}
    >
      <BaseDialogProvider onClose={onClose}>{children}</BaseDialogProvider>
    </Dialog>
  );
};

export default BaseDialog;
