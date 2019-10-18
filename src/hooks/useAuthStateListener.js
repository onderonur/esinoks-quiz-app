import useFirebase from "./useFirebase";
import { useEffect, useState } from "react";

const useAuthStateListener = () => {
  const firebase = useFirebase();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      setAuthUser(authUser);
    });

    // Removing the listener on clean up.
    return () => listener();
  }, [firebase]);

  return authUser;
};

export default useAuthStateListener;
