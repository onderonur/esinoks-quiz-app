import React from "react";
import { Redirect, Route } from "react-router-dom";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const PrivateRoute = props => {
  const { isLoggedIn, isFetching, authUser } = useSelectAuthUser();

  return isLoggedIn === undefined || isFetching ? null : authUser ? (
    <Route {...props} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
