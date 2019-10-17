import React from "react";
import earthPng from "assets/earth.png";
import { makeStyles } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles(theme => ({
  image: {
    width: "15%"
  }
}));

const Earth = () => {
  const classes = useStyles();
  const props = useSpring({
    from: {
      transform: "rotate(0deg)"
    },
    to: async next => {
      let counter = 1;
      while (true) {
        await next({ transform: `rotate(${counter * 360}deg)` });
        counter++;
      }
    },
    config: {
      duration: 60000
    }
  });

  return (
    <animated.img
      className={classes.image}
      style={props}
      src={earthPng}
      alt="astronaut"
    />
  );
};

export default Earth;
