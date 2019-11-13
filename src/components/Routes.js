import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "pages/HomePage";
import QuizPage from "pages/QuizPage";
import ProfilePage from "pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import QuizCreatorPage from "pages/QuizCreatorPage";
import NotFound404Page from "pages/NotFound404Page";

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
      <Route path="*">
        <NotFound404Page />
      </Route>
    </Switch>
  );
};

export default Routes;
