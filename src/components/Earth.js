import React from "react";
import earthPng from "assets/earth.png";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  image: {
    width: 160,
    position: "absolute",
    right: "5%",
    animation: "$rotating 60s linear infinite"
  },
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
}));

const Earth = () => {
  const classes = useStyles();

  return <img className={classes.image} src={earthPng} alt="astronaut" />;
};

export default Earth;
