import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  colors
} from "@material-ui/core";
import { selectQuestion } from "actions";
import { Planet } from "react-kawaii";

const QuestionGridListItem = ({ questionId, index }) => {
  const dispatch = useDispatch();
  const question = useSelector(state =>
    selectors.selectQuestionById(state, questionId)
  );
  const answerIndex = useSelector(state =>
    selectors.selectGivenAnswerByQuestionId(state, questionId)
  );

  const didAnswered = answerIndex !== undefined;
  const { correctAnswer } = question || {};
  const isTrueAnswer = didAnswered && correctAnswer === answerIndex;
  const isWrongAnswer = didAnswered && correctAnswer !== answerIndex;

  let mood = "happy";
  let color = colors.blueGrey[400];

  if (isTrueAnswer) {
    mood = "blissful";
    color = colors.green[400];
  } else if (isWrongAnswer) {
    mood = "sad";
    color = colors.red[400];
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
            <Planet mood={mood} color={color} size={80} />
          </Box>
          <Typography variant="subtitle1" noWrap>
            Soru {index + 1}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuestionGridListItem;
