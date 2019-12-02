import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    userSelect: "none",
    fontWeight: "bold",
    fontFamily: "Maven Pro, sans-serif"
  }
}));

const AppTitle = ({ variant, color }) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant={variant} color={color}>
      ESİNOKS
    </Typography>
  );
};

export default AppTitle;
