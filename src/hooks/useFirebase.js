import { useContext } from "react";
import { FirebaseContext } from "components/FirebaseProvider";

const useFirebase = () => {
  const firebase = useContext(FirebaseContext);

  return firebase;
};

export default useFirebase;
