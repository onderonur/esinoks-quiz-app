import React from "react";
import { Paper, Box, makeStyles, Typography } from "@material-ui/core";
import { Browser } from "react-kawaii";
import BaseButton from "components/BaseButton";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const ErrorFallback = ({ title, subtitle }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h4" color="textSecondary" align="center">
          {subtitle}
        </Typography>
        <Box marginY={3}>
          <Browser size={200} mood="shocked" color="#61DDBC" />
        </Box>
        <Box display="flex" justifyContent="center">
          <BaseButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => window.location.replace("/")}
          >
            Ana Sayfa'ya Dön
          </BaseButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ErrorFallback;
