import React from "react";
import { useSelector } from "react-redux";
import { selectors, GAME_STATUSSES } from "reducers";
import { Typography, makeStyles, Grow } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  slowFloat: {
    animation: "$floating 2200ms ease infinite"
  },
  fastFloat: {
    animation: "$floating 600ms ease infinite"
  },
  rotate: {
    animation: "$rotating 4000ms linear infinite"
  },
  text: {
    userSelect: "none",
    fontFamily: "fantasy",
    textAlign: "center"
  },
  "@keyframes floating": {
    "0%": {
      transform: "translateY(15px)"
    },
    "50%": {
      transform: "translateY(-15px)"
    },
    "100%": {
      transform: "translateY(15px)"
    }
  },
  "@keyframes rotating": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "25%": {
      transform: "rotate(2deg)"
    },
    "50%": {
      transform: "rotate(0deg)"
    },
    "75%": {
      transform: "rotate(-2deg)"
    },
    "100%": {
      transform: "rotate(0deg)"
    }
  }
}));

const QuizGameMessage = ({ quizId }) => {
  const { status } = useSelector(state =>
    selectors.selectQuizGameInfo(state, quizId)
  );

  const statusCases = {
    [GAME_STATUSSES.PLAYING]: {
      in: false,
      color: "primary",
      title: "",
      subtitle: "",
      rotating: true,
      floatingSpeed: "SLOW"
    },
    [GAME_STATUSSES.WINNER]: {
      in: true,
      color: "secondary",
      title: "TEBRİKLER!",
      subtitle: "Quiz'i başarıyla tamamladınız.",
      rotating: false,
      floatingSpeed: "FAST"
    },
    [GAME_STATUSSES.GAME_OVER]: {
      in: true,
      color: "error",
      title: "ŞANSIN BİTTİ!",
      subtitle: "Üzgünüz, ama bu quiz'i tamamlayamadın.",
      rotating: true,
      floatingSpeed: "SLOW"
    }
  };

  const currentCase = statusCases[status];

  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        currentCase.floatingSpeed === "FAST"
          ? classes.fastFloat
          : classes.slowFloat
      )}
    >
      <div className={clsx(currentCase.rotating && classes.rotate)}>
        <Grow in={currentCase.in}>
          <div>
            <Typography
              variant="h1"
              color={currentCase.color}
              className={classes.text}
            >
              {currentCase.title}
            </Typography>
            <Typography
              variant="h4"
              color={currentCase.color}
              className={classes.text}
            >
              {currentCase.subtitle}
            </Typography>
          </div>
        </Grow>
      </div>
    </div>
  );
};

export default QuizGameMessage;
