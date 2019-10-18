import React from "react";
import astronautPng from "assets/astronaut.png";
import { makeStyles } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { selectors } from "reducers";

const DEFAULT_WIDTH = 100;
const DEFAULT_LEFT_PERCENT = 15;

const useStyles = makeStyles(theme => ({
  image: {
    position: "absolute",
    zIndex: 1,
    width: DEFAULT_WIDTH,
    animation: "$floating 3300ms ease infinite"
  },
  // When there is a looping animation, react-springs crashes the browser if a state change occurs.
  // So, we just use the keyframes for this particular animation.
  "@keyframes floating": {
    "0%": {
      transform: "translateY(-20px) scaleX(-1)"
    },
    "50%": {
      transform: "translateY(20px) scaleX(-1)"
    },
    "100%": {
      transform: "translateY(-20px) scaleX(-1)"
    }
  },
}));

const Astronaut = () => {
  const classes = useStyles();

  const totalQuestionsCount = useSelector(state =>
    selectors.selectTotalQuestionsCount(state)
  );
  const totalTrueAnswersCount = useSelector(state =>
    selectors.selectTotalTrueAnswerCount(state)
  );

  const astronautOffset = DEFAULT_WIDTH / 2;

  const props = useSpring({
    from: {
      left: `calc(${DEFAULT_LEFT_PERCENT}% - 80px - ${astronautOffset}px)`
    },
    left: `calc(${DEFAULT_LEFT_PERCENT +
      ((95 - DEFAULT_LEFT_PERCENT) * totalTrueAnswersCount) /
        totalQuestionsCount}% - 80px - ${astronautOffset}px)`,
    config: {
      duration: 800
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
