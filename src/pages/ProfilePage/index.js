import React from "react";
import { Paper } from "@material-ui/core";
import ProfileHeader from "./ProfileHeader";
import { makeStyles } from "@material-ui/styles";
import ProfileTabs from "./ProfileTabs";

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
        <ProfileTabs />
      </Paper>
    </>
  );
};

export default ProfilePage;
