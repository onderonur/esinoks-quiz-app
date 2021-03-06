import React from "react";
import { Redirect, Route } from "react-router-dom";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const PrivateRoute = props => {
  const { isSignedIn, isFetching, authUser } = useSelectAuthUser();

  return isSignedIn === undefined || isFetching ? null : authUser ? (
    <Route {...props} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
