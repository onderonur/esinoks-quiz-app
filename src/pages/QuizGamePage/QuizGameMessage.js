import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { Typography, makeStyles, Grow } from "@material-ui/core";
import clsx from "clsx";
import GAME_STATUSSES from "constants/gameStatusses";

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
  text: {
    userSelect: "none",
    fontFamily: "fantasy",
    textAlign: "center"
  },
  "@keyframes floating": {
    "0%": {
      transform: "translateY(5px)"
    },
    "50%": {
      transform: "translateY(-5px)"
    },
    "100%": {
      transform: "translateY(5px)"
    }
  }
}));

const statusCases = {
  [GAME_STATUSSES.PLAYING]: {
    in: false,
    color: "primary",
    title: "",
    subtitle: ""
  },
  [GAME_STATUSSES.WINNER]: {
    in: true,
    color: "secondary",
    title: "TEBRİKLER!",
    subtitle: "Quiz'i başarıyla tamamladınız."
  },
  [GAME_STATUSSES.GAME_OVER]: {
    in: true,
    color: "error",
    title: "MALESEF!",
    subtitle: "Üzgünüz, ama bu quiz'i tamamlayamadın."
  }
};

const QuizGameMessage = ({ quizId }) => {
  const {
    correctGivenAnswerCount,
    wrongGivenAnswerCount,
    status
  } = useSelector(state => selectors.selectQuizGameInfo(state, quizId));

  const classes = useStyles();

  const currentCase = statusCases[status];

  return (
    <div className={clsx(classes.root, classes.slowFloat)}>
      <Grow in={currentCase.in}>
        <div>
          <Typography
            variant="h3"
            color={currentCase.color}
            className={classes.text}
          >
            {currentCase.title}
          </Typography>
          <Typography
            variant="h6"
            color={currentCase.color}
            className={classes.text}
          >
            {currentCase.subtitle}
          </Typography>
          <Typography variant="h6" color="secondary" className={classes.text}>
            Doğru Cevap: {correctGivenAnswerCount}
          </Typography>
          <Typography variant="h6" color="error" className={classes.text}>
            Yanlış Cevap: {wrongGivenAnswerCount}
          </Typography>
        </div>
      </Grow>
    </div>
  );
};

export default QuizGameMessage;
