import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { selectQuestion } from "actions";
import { ANSWER_RESULTS } from "reducers/answers";
import { makeStyles } from "@material-ui/styles";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  trueAnswer: {
    color: green[400]
  },
  wrongAnswer: {
    color: red[400]
  }
}));

const QuestionGridListItem = ({ questionId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const question = useSelector(state =>
    selectors.selectQuestionById(state, questionId)
  );
  const answerResult = useSelector(state =>
    selectors.selectAnswerResultByQuestionId(state, questionId)
  );

  let icon = <PlayArrowIcon color="disabled" fontSize="large" />;

  switch (answerResult) {
    case ANSWER_RESULTS.true:
      icon = <CheckIcon className={classes.trueAnswer} fontSize="large" />;
      break;
    case ANSWER_RESULTS.false:
      icon = <CloseIcon className={classes.wrongAnswer} fontSize="large" />;
      break;
    default:
  }

  return (
    <Card>
      <CardActionArea onClick={() => dispatch(selectQuestion(questionId))}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingY={2}
          >
            {icon}
          </Box>
          <Typography variant="body1" noWrap>
            {question.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuestionGridListItem;
