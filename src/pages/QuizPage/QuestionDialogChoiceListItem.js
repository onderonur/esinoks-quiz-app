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
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  wrongAnswer: {
    "&$checked": {
      color: red[600]
    }
  },
  trueAnswer: {
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
}));

const QuestionDialogChoiceListItem = ({
  choiceIndex,
  choice,
  isSelected,
  onSelected,
  disabled
}) => {
  const classes = useStyles();
  const activeQuestion = useSelector(state =>
    selectors.selectActiveQuestion(state)
  );
  const answerIndex = useSelector(state =>
    activeQuestion
      ? selectors.selectGivenAnswerByQuestionId(state, activeQuestion.id)
      : null
  );
  const correctAnswer = useSelector(state =>
    activeQuestion
      ? selectors.selectCorrectAnswerByQuestionId(state, activeQuestion.id)
      : null
  );

  const didAnswered = answerIndex !== undefined;
  const isTrueAnswer = Boolean(didAnswered && choiceIndex === correctAnswer);
  const isWrongAnswer = Boolean(didAnswered && !isTrueAnswer);

  return (
    <ListItem
      button
      // When we are fetching the answer, the selected choice cannot be changed.
      selected={isSelected}
      disabled={disabled}
      onClick={() => onSelected(choiceIndex)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          checked={isSelected || isTrueAnswer}
          className={clsx(
            isTrueAnswer && classes.trueAnswer,
            isWrongAnswer && classes.wrongAnswer
          )}
          disableRipple
          classes={{
            checked: classes.checked
          }}
        />
      </ListItemIcon>
      <ListItemText primary={choice} />
    </ListItem>
  );
};

export default QuestionDialogChoiceListItem;
