import React from "react";
import { Paper, Box, makeStyles, Typography } from "@material-ui/core";
import { Browser } from "react-kawaii";
import BaseButton from "components/BaseButton";
import RouterLink from "components/RouterLink";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const NotFound404 = () => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center">
      <Paper className={classes.paper}>
        <Typography variant="h2">404</Typography>
        <Typography variant="h4" color="textSecondary">
          Aradığınız içeriği bulamadık.
        </Typography>
        <Box marginY={3}>
          <Browser size={300} mood="shocked" color="#61DDBC" />
        </Box>
        <Box display="flex" justifyContent="center">
          <BaseButton
            to="/profile"
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
          >
            Profile Dön
          </BaseButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotFound404;
