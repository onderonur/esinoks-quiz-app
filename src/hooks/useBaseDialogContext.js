import { useContext } from "react";
import BaseDialogContext from "components/BaseDialogContext";

const useBaseDialogContext = () => {
  const close = useContext(BaseDialogContext);

  return close;
};

export default useBaseDialogContext;
