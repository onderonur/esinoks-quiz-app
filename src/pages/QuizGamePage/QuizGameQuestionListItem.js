import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  colors,
  ListItem
} from "@material-ui/core";
import { selectQuestion } from "actions";
import { Planet } from "react-kawaii";
import { useParams } from "react-router-dom";
import useDetectMobile from "hooks/useDetectMobile";

const QuestionGameQuestionListItem = ({ questionId, index }) => {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const question = useSelector(state =>
    selectors.selectQuestion(state, questionId)
  );
  const givenAnswer = useSelector(state =>
    selectors.selectGivenAnswer(state, quizId, questionId)
  );
  const activeQuestionId = useSelector(state =>
    selectors.selectActiveQuestionId(state)
  );
  const isMobile = useDetectMobile();

  const didAnswered = givenAnswer !== undefined;
  const { correctAnswer } = question || {};
  const isTrueAnswer = didAnswered && correctAnswer === givenAnswer;
  const isWrongAnswer = didAnswered && correctAnswer !== givenAnswer;
  const isActiveQuestion = activeQuestionId === questionId;

  let mood = "happy";
  let color = colors.blueGrey[400];

  if (isTrueAnswer) {
    mood = "blissful";
    color = colors.green[400];
  } else if (isWrongAnswer) {
    mood = "sad";
    color = colors.red[400];
  } else if (isActiveQuestion) {
    mood = "excited";
  }

  return (
    <ListItem disableGutters>
      <Card>
        <CardActionArea onClick={() => dispatch(selectQuestion(questionId))}>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Planet mood={mood} color={color} size={isMobile ? 30 : 50} />
            </Box>
            <Typography variant="caption" noWrap>
              Soru {index + 1}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default QuestionGameQuestionListItem;
