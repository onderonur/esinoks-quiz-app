import { useDispatch } from "react-redux";
import * as actions from "actions";
import { useCallback } from "react";

const useNotifier = () => {
  const dispatch = useDispatch();

  const enqueueSnackbar = useCallback(
    (message, options) => {
      dispatch(actions.enqueueSnackbar(message, options));
    },
    [dispatch]
  );

  const closeSnackbar = useCallback(
    key => {
      dispatch(actions.closeSnackbar(key));
    },
    [dispatch]
  );

  const removeSnackbar = useCallback(
    key => {
      dispatch(actions.removeSnackbar(key));
    },
    [dispatch]
  );

  return { enqueueSnackbar, closeSnackbar, removeSnackbar };
};

export default useNotifier;
