import React, { useEffect, useState, useCallback } from "react";
import { Dialog } from "@material-ui/core";
import { BaseDialogContext } from "hooks/useBaseDialogContext";

const BaseDialog = ({
  isOpen,
  onExited,
  children,
  fullWidth = true,
  disablePortal,
  fullScreen
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // We used this way to wait dialog animation to end before calling "onExited" callback.
  // So rather than relying on the "isOpen" prop, we just use it as a secondary parameter.
  // The main flag that shows and hides the dialog is "isVisible" state.
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // When user redirects to another route, this clean up function will be executed.
  // So when he comes back to the previous page where this dialog is used, he will not see the
  // previously opened dialog.
  // TODO: This may need some fix.
  useEffect(() => {
    if (isOpen) {
      return () => onExited();
    }
  }, [isOpen, onExited]);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <Dialog
      fullWidth={fullWidth}
      disablePortal={disablePortal}
      open={isVisible}
      onClose={close}
      // We wait for the closing animation to end, then call the "onExited" callback.
      onExited={onExited}
      fullScreen={fullScreen}
    >
      <BaseDialogContext.Provider value={close}>
        {children}
      </BaseDialogContext.Provider>
    </Dialog>
  );
};

export default BaseDialog;
