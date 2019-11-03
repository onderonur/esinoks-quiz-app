import React from "react";
import { CssBaseline, Box, Container, makeStyles } from "@material-ui/core";
import Space from "components/Space";
import App from "./App";
import AppHeader from "./AppHeader";

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(2)
  }
}));

const Root = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Box minWidth={800}>
        <Space>
          <AppHeader />
          <div className={classes.offset} />
          <Container maxWidth="lg" className={classes.content}>
            <App />
          </Container>
        </Space>
      </Box>
    </>
  );
};

export default Root;
