import useFirebase from "./useFirebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authStateChanged } from "actions";

const useAuthStateListener = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      dispatch(authStateChanged(authUser));
    });

    // Removing the listener on clean up.
    return () => listener();
  }, [firebase, dispatch]);
};

export default useAuthStateListener;
