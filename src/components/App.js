import React, { useEffect } from "react";
import Routes from "./Routes";
import LoadingIndicator from "./LoadingIndicator";
import { listenAuthState, listenAuthStateCancel } from "actions";
import { useDispatch } from "react-redux";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const App = () => {
  const dispatch = useDispatch();
  const { isFetching, isLoggedIn } = useSelectAuthUser();

  useEffect(() => {
    dispatch(listenAuthState());

    return () => dispatch(listenAuthStateCancel());
  }, [dispatch]);

  return (
    <LoadingIndicator loading={isFetching || isLoggedIn === undefined}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
