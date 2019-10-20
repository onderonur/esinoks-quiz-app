import React from "react";
import { Paper, Box, Divider } from "@material-ui/core";
import ProfileHeader from "./ProfileHeader";
import { makeStyles } from "@material-ui/styles";
import QuizFormDialog from "./QuizFormDialog";
import QuizList from "./QuizList";
import { Route } from "react-router-dom";
import QuizCreator from "./QuizCreator";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const ProfilePage = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Box marginY={2}>
          <ProfileHeader />
        </Box>
        <Divider />

        <Route exact path="/profile">
          <QuizList />
        </Route>
        <Route path={`/profile/quiz/:quizId`}>
          <QuizCreator />
        </Route>
      </Paper>
      <QuizFormDialog />
    </>
  );
};

export default ProfilePage;
