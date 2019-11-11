import React, { useEffect } from "react";
import Routes from "./Routes";
import LoadingIndicator from "./LoadingIndicator";
import { listenAuthState } from "actions";
import { useDispatch } from "react-redux";
import useFirebase from "hooks/useFirebase";
import { LISTEN_AUTH_STATE } from "constants/actionTypes";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const App = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const { isFetching, isLoggedIn } = useSelectAuthUser();

  useEffect(() => {
    dispatch(listenAuthState());

    return () => dispatch({ type: LISTEN_AUTH_STATE + "_CANCELLED" });
  }, [firebase, dispatch]);

  return (
    <LoadingIndicator loading={isFetching || isLoggedIn === undefined}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
