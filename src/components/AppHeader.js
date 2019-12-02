import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Link,
  useScrollTrigger,
  Box
} from "@material-ui/core";
import UserButton from "./UserButton";
import RouterLink from "./RouterLink";
import { fade } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "assets/logo.svg";
import AppTitle from "./AppTitle";

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
  titleLink: {
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
        <Box width={50} height={50} clone marginRight={1}>
          <Logo />
        </Box>
        <Link
          className={classes.titleLink}
          to="/"
          color="inherit"
          component={RouterLink}
        >
          <AppTitle variant="h6" />
        </Link>
        <Box flex={1} />
        <UserButton />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
