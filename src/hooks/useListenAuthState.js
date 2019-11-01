import useFirebase from "./useFirebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authStateChanged } from "actions";

const useListenAuthState = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [isFetching, setInFetching] = useState(true);

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      dispatch(authStateChanged(authUser));
      setInFetching(false);
    });

    // Removing the listener on clean up.
    return () => listener();
  }, [firebase, dispatch]);

  return isFetching;
};

export default useListenAuthState;
