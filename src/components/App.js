import React, { useEffect } from "react";
import Routes from "./Routes";
import LoadingIndicator from "./LoadingIndicator";
import { listenAuthState } from "actions";
import { useDispatch } from "react-redux";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const App = () => {
  const dispatch = useDispatch();
  const { isFetching, isSignedIn } = useSelectAuthUser();

  useEffect(() => {
    dispatch(listenAuthState());
    return () => dispatch(listenAuthState.cancelled());
  }, [dispatch]);

  return (
    <LoadingIndicator loading={isFetching || isSignedIn === undefined}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
