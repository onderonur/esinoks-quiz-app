import useFirebase from "./useFirebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authStateChanged } from "actions";

const useAuthStateListener = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      dispatch(authStateChanged(authUser));
      setInitialized(true);
    });

    // Removing the listener on clean up.
    return () => listener();
  }, [firebase, dispatch]);

  return initialized;
};

export default useAuthStateListener;
