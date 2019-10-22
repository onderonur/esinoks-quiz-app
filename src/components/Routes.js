import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import QuizPage from "pages/QuizPage";
import ProfilePage from "pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import QuizCreatorPage from "pages/QuizCreatorPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/quiz">
        <QuizPage />
      </Route>

      <PrivateRoute exact path="/profile">
        <ProfilePage />
      </PrivateRoute>

      <PrivateRoute path={`/profile/quiz/:quizId`}>
        <QuizCreatorPage />
      </PrivateRoute>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;