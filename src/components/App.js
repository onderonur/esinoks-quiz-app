import React, { useEffect } from "react";
import Routes from "./Routes";
import LoadingIndicator from "./LoadingIndicator";
import { listenAuthState } from "actions";
import { useDispatch } from "react-redux";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const App = () => {
  const dispatch = useDispatch();
  const { isFetching, isLoggedIn } = useSelectAuthUser();

  useEffect(() => {
    dispatch(listenAuthState.base());
    return () => dispatch(listenAuthState.cancelled());
  }, [dispatch]);

  return (
    <LoadingIndicator loading={isFetching || isLoggedIn === undefined}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
