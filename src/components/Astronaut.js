import React from "react";
import astronautPng from "assets/astronaut.png";
import { makeStyles } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles(theme => ({
  image: {
    width: "12%",
    transform: "scaleX(-1)"
  }
}));

const Astronaut = () => {
  const classes = useStyles();
  const props = useSpring({
    from: {
      transform: "translateY(-20px) scaleX(-1)"
    },
    to: async next => {
      while (true) {
        await next({ transform: "translateY(20px) scaleX(-1)" });
        await next({ transform: "translateY(-20px) scaleX(-1)" });
      }
    },
    config: {
      duration: 2200
    }
  });

  return (
    <animated.img
      className={classes.image}
      style={props}
      src={astronautPng}
      alt="astronaut"
    />
  );
};

export default Astronaut;
