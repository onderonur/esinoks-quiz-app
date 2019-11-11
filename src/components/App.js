import React, { useEffect } from "react";
import Routes from "./Routes";
import LoadingIndicator from "./LoadingIndicator";
import { listenAuthState, listenAuthStateCancel } from "actions";
import { useDispatch } from "react-redux";
import useFirebase from "hooks/useFirebase";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const App = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const { isFetching, isLoggedIn } = useSelectAuthUser();

  useEffect(() => {
    dispatch(listenAuthState());

    return () => dispatch(listenAuthStateCancel());
  }, [firebase, dispatch]);

  return (
    <LoadingIndicator loading={isFetching || isLoggedIn === undefined}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
