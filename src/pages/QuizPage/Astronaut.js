import React from "react";
import astronautPng from "assets/astronaut.png";
import { makeStyles } from "@material-ui/styles";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { useParams } from "react-router-dom";
import clsx from "clsx";

const DEFAULT_WIDTH = 100;
const DEFAULT_ASTRONAUT_OFFSET = DEFAULT_WIDTH / 2;
const DEFAULT_LEFT_PERCENT = 15;
const DEFAULT_ASTRONAUT_LEFT = `calc(${DEFAULT_LEFT_PERCENT}% - 80px - ${DEFAULT_ASTRONAUT_OFFSET}px)`;

const useStyles = makeStyles(theme => ({
  image: {
    position: "absolute",
    zIndex: 1,
    width: DEFAULT_WIDTH,
    animation: "$floating 3300ms ease infinite"
  },
  gameOver: {
    animation: "$rotating 200ms linear infinite"
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
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
}));

const Astronaut = () => {
  const classes = useStyles();
  const { quizId } = useParams();

  const totalQuestionCount = useSelector(state =>
    selectors.selectTotalQuestionCountByQuizId(state, quizId)
  );

  const wrongGivenAnswerCount = useSelector(state =>
    selectors.selectWrongGivenAnswerCountByQuizId(state, quizId)
  );

  const isGameOver = useSelector(state =>
    selectors.selectIsGameOver(state, quizId)
  );

  // We reduce the "steps to finish" by the wrong given answers count.
  // So that the user can reach the finish point even if there are wrong answers.
  const totalStepsToFinish = totalQuestionCount
    ? totalQuestionCount - wrongGivenAnswerCount
    : null;

  const totalCorrectAnswerCount = useSelector(state =>
    selectors.selectCorrectGivenAnswerCountByQuizId(state, quizId)
  );

  const props = useSpring({
    from: {
      left: DEFAULT_ASTRONAUT_LEFT,
      width: DEFAULT_WIDTH
    },
    left: totalStepsToFinish
      ? `calc(${DEFAULT_LEFT_PERCENT +
          ((95 - DEFAULT_LEFT_PERCENT) * totalCorrectAnswerCount) /
            totalStepsToFinish}% - 80px - ${DEFAULT_ASTRONAUT_OFFSET}px)`
      : DEFAULT_ASTRONAUT_LEFT,
    width: isGameOver ? 0 : DEFAULT_WIDTH,
    // TODO: May separate these 2 animations with different durations etc.
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
