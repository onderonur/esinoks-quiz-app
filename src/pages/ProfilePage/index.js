import React from "react";
import { Paper } from "@material-ui/core";
import ProfileHeader from "./ProfileHeader";
import { makeStyles } from "@material-ui/styles";
import QuizFormDialog from "./QuizFormDialog";
import QuizList from "./QuizList";
import BaseDivider from "components/BaseDivider";

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
        <ProfileHeader />
        <BaseDivider />
        <QuizList />
      </Paper>
      <QuizFormDialog />
    </>
  );
};

export default ProfilePage;
