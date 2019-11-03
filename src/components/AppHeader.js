import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Link,
  useScrollTrigger
} from "@material-ui/core";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import RestartQuizButton from "./RestartQuizButton";
import UserButton from "./UserButton";
import RouterLink from "./RouterLink";
import { fade } from "@material-ui/core/styles";

const SCROLL_TRIGGER_THRESHOLD = 80;

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: ({ trigger }) =>
      fade(theme.palette.primary.main, trigger ? 1 : 0.15),
    transition: theme.transitions.create("background-color", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard
    })
  },
  title: {
    flexGrow: 1,
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

const AppHeader = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: SCROLL_TRIGGER_THRESHOLD
  });
  const classes = useStyles({ trigger });

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
