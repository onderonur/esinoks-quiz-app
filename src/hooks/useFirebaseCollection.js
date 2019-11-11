import { useState, useEffect, useCallback, useRef } from "react";
import useFirebase from "./useFirebase";

const useFirebaseCollection = ({ query, skip }) => {
  const firebase = useFirebase();
  const [isFetching, setIsFetching] = useState(!skip);
  const [docs, setDocs] = useState();
  const moreListenerRef = useRef();

  useEffect(() => {
    if (!skip) {
      query(firebase).get().then(snapshot => {
        setIsFetching(false);
        setDocs(snapshot.docs);
      });
    }
  }, [firebase, query, skip]);

  const fetchMore = useCallback(() => {
    setIsFetching(true);
    const lastVisible = docs[docs.length - 1];
    moreListenerRef.current = query(firebase)
      .startAfter(lastVisible)
      .get().then(moreSnapshot => {
        setIsFetching(false);
        setDocs([...docs, ...moreSnapshot.docs]);
      });
  }, [firebase, query, docs]);

  return { isFetching, docs, fetchMore };
};

export default useFirebaseCollection;
