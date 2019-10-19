import React from "react";
import { Paper, Box, makeStyles } from "@material-ui/core";
import SignInWithGoogleButton from "components/SignInWithGoogleButton";

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

  return (
    <Box display="flex" justifyContent="center">
      <Paper className={classes.paper}>
        <SignInWithGoogleButton />
      </Paper>
    </Box>
  );
};

export default HomePage;
