import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import QuizPage from "pages/QuizPage";
import ProfilePage from "pages/ProfilePage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/quiz">
        <QuizPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
