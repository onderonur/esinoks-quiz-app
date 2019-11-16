import { useContext } from "react";
import { FirebaseContext } from "components/FirebaseProvider";

const useFirebaseAPI = () => {
  const firebaseAPI = useContext(FirebaseContext);

  return firebaseAPI;
};

export default useFirebaseAPI;
