import React, { useEffect } from "react";
import Routes from "./Routes";
import LoadingIndicator from "./LoadingIndicator";
import { listenAuthState } from "actions";
import { useDispatch, useSelector } from "react-redux";
import useFirebase from "hooks/useFirebase";
import { LISTEN_AUTH_STATE } from "constants/actionTypes";
import { selectors } from "reducers";

const App = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAuthState(state)
  );

  useEffect(() => {
    dispatch(listenAuthState());

    return () => dispatch({ type: LISTEN_AUTH_STATE + "_CANCELLED" });
  }, [firebase, dispatch]);

  return (
    <LoadingIndicator loading={isFetching}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
