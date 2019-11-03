import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import RestartQuizButton from "./RestartQuizButton";
import UserButton from "./UserButton";
import RouterLink from "./RouterLink";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "rgba(0, 0, 0, 0.15)"
  },
  title: {
    flexGrow: 1,
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

const AppHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Link
          className={classes.title}
          to="/"
          color="inherit"
          component={RouterLink}
        >
          <Typography variant="h6">Esinoks</Typography>
        </Link>
        <SignInWithGoogleButton />
        <RestartQuizButton />
        <UserButton />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
