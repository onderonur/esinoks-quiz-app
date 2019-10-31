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

const QuestionGridListItem = ({ questionId }) => {
  const dispatch = useDispatch();
  const question = useSelector(state =>
    selectors.selectQuestionById(state, questionId)
  );
  const { correctAnswer } = question;
  const answerIndex = useSelector(state =>
    selectors.selectGivenAnswerByQuestionId(state, questionId)
  );

  const didAnswered = answerIndex !== undefined;
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
            <Planet mood={mood} color={color} size={100} />
          </Box>
          <Typography variant="body1" noWrap>
            {question.body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuestionGridListItem;
