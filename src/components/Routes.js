import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import QuizPage from "pages/QuizPage";
import ProfilePage from "pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import QuizCreatorPage from "pages/QuizCreatorPage";
import NotFound404 from "pages/NotFound404";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/quiz/:quizId">
        <QuizPage />
      </Route>

      <PrivateRoute exact path="/profile">
        <ProfilePage />
      </PrivateRoute>

      <PrivateRoute path={`/profile/quiz/:quizId`}>
        <QuizCreatorPage />
      </PrivateRoute>

      <Route path="/not-found-404">
        <NotFound404 />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
