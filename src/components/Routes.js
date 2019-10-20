import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import QuizPage from "pages/QuizPage";
import ProfilePage from "pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/quiz">
        <QuizPage />
      </Route>

      <PrivateRoute path="/profile">
        <ProfilePage />
      </PrivateRoute>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
