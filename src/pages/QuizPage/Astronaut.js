import React from "react";
import astronautPng from "assets/astronaut.png";
import { makeStyles } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { selectors, GAME_STATUSSES } from "reducers";
import clsx from "clsx";
import { DEFAULT_EARTH_SIZE } from "./Earth";

const DEFAULT_WIDTH = 12;
const DEFAULT_FINISH_OFFSET = (DEFAULT_EARTH_SIZE + DEFAULT_WIDTH) / 2;
const DEFAULT_ASTRONAUT_LEFT = "0%";

const useStyles = makeStyles(theme => ({
  image: {
    position: "absolute",
    zIndex: 1,
    animation: "$floating 3300ms ease infinite"
  },
  gameOver: {
    animation: "$rotating 200ms linear infinite"
  },
  // When there is a looping animation, react-springs crashes the browser if a state change occurs.
  // So, we just use the keyframes for this particular animations.
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
  "@keyframes rotating": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    }
  }
}));

const Astronaut = ({ quizId }) => {
  const classes = useStyles();

  const { totalStepsToFinish, progressRate, status } = useSelector(state =>
    selectors.selectQuizGameInfo(state, quizId)
  );

  const isGameOver = status === GAME_STATUSSES.GAME_OVER;

  const props = useSpring({
    from: {
      left: DEFAULT_ASTRONAUT_LEFT,
      width: `${DEFAULT_WIDTH}%`
    },
    left: totalStepsToFinish
      ? `${(100 - DEFAULT_FINISH_OFFSET) * progressRate}%`
      : DEFAULT_ASTRONAUT_LEFT,
    width: isGameOver ? "0%" : `${DEFAULT_WIDTH}%`,
    config: {
      duration: 800
    }
  });

  return (
    <animated.img
      className={clsx(classes.image, isGameOver && classes.gameOver)}
      style={props}
      src={astronautPng}
      alt="astronaut"
    />
  );
};

export default Astronaut;
