import React from "react";
import { Paper, Box, makeStyles } from "@material-ui/core";
import SignInWithGoogleButton from "components/SignInWithGoogleButton";
import { Redirect } from "react-router-dom";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 600
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const authUser = useSelectAuthUser();

  return authUser ? (
    <Redirect to="/profile" />
  ) : (
    <Box display="flex" justifyContent="center">
      <Paper className={classes.paper}>
        <SignInWithGoogleButton />
      </Paper>
    </Box>
  );
};

export default HomePage;
