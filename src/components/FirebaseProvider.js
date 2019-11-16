import React from "react";
import firebaseAPI from "firebaseAPI";

export const FirebaseContext = React.createContext();

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebaseAPI}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
