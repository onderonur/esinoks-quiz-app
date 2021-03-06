import React from "react";
import earthPng from "assets/earth.png";
import { makeStyles } from "@material-ui/styles";

export const DEFAULT_EARTH_SIZE = 12;

const useStyles = makeStyles(theme => ({
  image: {
    width: DEFAULT_EARTH_SIZE + "%",
    position: "absolute",
    right: 0,
    animation: "$rotating 60s linear infinite"
  },
  "@keyframes rotating": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  }
}));

const Earth = () => {
  const classes = useStyles();

  return <img className={classes.image} src={earthPng} alt="earth" />;
};

export default Earth;
