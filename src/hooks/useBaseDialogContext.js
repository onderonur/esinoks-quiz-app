import React, { useContext } from "react";

export const BaseDialogContext = React.createContext();

const useBaseDialogContext = () => {
  const close = useContext(BaseDialogContext);

  return close;
};

export default useBaseDialogContext;
