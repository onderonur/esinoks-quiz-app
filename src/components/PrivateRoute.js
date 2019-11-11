import React from "react";
import { Redirect, Route } from "react-router-dom";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const PrivateRoute = props => {
  const { authUser } = useSelectAuthUser();

  return authUser ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRoute;
