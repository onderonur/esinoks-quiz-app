import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConfirmDialogContext from "components/ConfirmDialogContext";

const useConfirmDialog = () => {
  const confirm = useContext(ConfirmDialogContext);
  const location = useLocation();

  useEffect(() => {
    return () => confirm(null);
  }, [confirm, location.key]);

  return confirm;
};

export default useConfirmDialog;
