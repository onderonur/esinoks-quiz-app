import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { selectChoice } from "actions";
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

const QuestionDialogChoiceListItem = ({ choice }) => {
  const classes = useStyles();
  const question = useSelector(state => selectors.selectActiveQuestion(state));
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingAnswer(state)
  );
  const dispatch = useDispatch();
  const answerId = useSelector(state =>
    question ? selectors.selectAnswerIdByQuestionId(state, question.id) : null
  );
  const selectedChoiceId = useSelector(state =>
    question ? selectors.selectChoiceIdByQuestionId(state, question.id) : null
  );

  const handleSelectChoice = choice => {
    // When we have the true answer, choice can not be changed.
    if (!answerId) {
      dispatch(selectChoice(question.id, choice.id));
    }
  };

  const isSelected = selectedChoiceId === choice.id;
  const isTrueAnswer = Boolean(answerId && choice.id === answerId);
  const isWrongAnswer = Boolean(isSelected && answerId && !isTrueAnswer);

  return (
    <ListItem
      button
      // When we are fetching the answer, the selected choice cannot be changed.
      disabled={isFetching}
      selected={isSelected}
      onClick={() => handleSelectChoice(choice)}
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
      <ListItemText primary={choice.text} />
    </ListItem>
  );
};

export default QuestionDialogChoiceListItem;
