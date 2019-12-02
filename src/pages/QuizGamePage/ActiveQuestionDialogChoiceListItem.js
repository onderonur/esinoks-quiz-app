import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { Colors } from "theme";

const useStyles = makeStyles(theme => ({
  trueAnswer: {
    "&$checked": {
      color: Colors.green
    }
  },
  wrongAnswer: {
    "&$checked": {
      color: Colors.red
    }
  },
  checked: {}
}));

const ActiveQuestionDialogChoiceListItem = ({
  choiceIndex,
  choice,
  isSelected,
  onSelected,
  disabled
}) => {
  const classes = useStyles();
  const { quizId } = useParams();
  const activeQuestion = useSelector(state =>
    selectors.selectActiveQuestion(state)
  );
  const givenAnswer = useSelector(state =>
    activeQuestion
      ? selectors.selectGivenAnswer(state, quizId, activeQuestion.id)
      : null
  );
  const correctAnswer = useSelector(state =>
    activeQuestion
      ? selectors.selectCorrectAnswerByQuestionId(state, activeQuestion.id)
      : null
  );

  const didAnswered = givenAnswer !== undefined;
  const isTrueAnswer = Boolean(didAnswered && choiceIndex === correctAnswer);
  const isWrongAnswer = Boolean(didAnswered && !isTrueAnswer);

  return (
    <ListItem
      button
      // When we are fetching the answer, the selected choice cannot be changed.
      selected={isSelected}
      disabled={disabled}
      dense
      onClick={() => onSelected(choiceIndex)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          disableRipple
          size="small"
          checked={isSelected || isTrueAnswer}
          className={clsx(
            isTrueAnswer && classes.trueAnswer,
            isWrongAnswer && classes.wrongAnswer
          )}
          classes={{
            checked: classes.checked
          }}
        />
      </ListItemIcon>
      <ListItemText primary={choice} />
    </ListItem>
  );
};

export default ActiveQuestionDialogChoiceListItem;
