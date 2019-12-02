import React from "react";
import BaseDialogContext from "./BaseDialogContext";

const BaseDialogProvider = ({ onClose, children }) => {
  return (
    <BaseDialogContext.Provider value={onClose}>
      {children}
    </BaseDialogContext.Provider>
  );
};

export default BaseDialogProvider;
