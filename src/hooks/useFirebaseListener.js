import { useState, useEffect } from "react";
import useFirebase from "./useFirebase";

const useFirebaseListener = ({ query, skip }) => {
  const firebase = useFirebase();
  const [isFetching, setIsFetching] = useState();
  const [snapshot, setSnapshot] = useState();

  useEffect(() => {
    if (!skip) {
      setIsFetching(true);
      const listener = query(firebase).onSnapshot(snapshot => {
        setIsFetching(false);
        setSnapshot(snapshot);
      });

      return () => listener();
    }
  }, [firebase, query, skip]);

  return { isFetching, snapshot };
};

export default useFirebaseListener;
