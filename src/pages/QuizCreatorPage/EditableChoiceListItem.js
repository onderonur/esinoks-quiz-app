import React from "react";
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Checkbox,
  makeStyles
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChoiceEditor from "./ChoiceEditor";
import { connect } from "formik";
import EditableChoiceListItemMenu from "./EditableChoiceListItemMenu";
import produce from "immer";
import { Colors } from "theme";

export const MIN_CHOICE_COUNT = 2;
export const MAX_CHOICE_COUNT = 6;
const CHOICE_KEYS = [..."ABCDEF"];

const useStyles = makeStyles(theme => ({
  trueAnswer: {
    "&$checked": {
      color: Colors.green
    }
  },
  checked: {}
}));

const EditableChoiceList = ({
  selectedChoiceIndex,
  choiceIndex,
  formik,
  onSelectChoice
}) => {
  const classes = useStyles();

  const { values, setFieldValue } = formik;

  const { isFetching: isCreating } = useSelector(state =>
    selectors.selectAsyncInfoCreateQuestion(state)
  );

  const { isFetching: isUpdating } = useSelector(state =>
    selectors.selectAsyncInfoUpdateQuestion(state)
  );

  const isFetching = isCreating || isUpdating;

  const { choices, correctAnswer } = values;

  const endEditing = () => onSelectChoice(null);

  const setChoice = (choiceIndex, text) => {
    const updatedChoices = produce(choices, draft => {
      draft[choiceIndex] = text;
    });
    setFieldValue("choices", updatedChoices);
    endEditing();
  };

  const choice = choices[choiceIndex];
  const isCorrectAnswer = correctAnswer === choiceIndex;

  return selectedChoiceIndex === choiceIndex ? (
    <ChoiceEditor
      initialValue={choice}
      onConfirm={text => setChoice(choiceIndex, text)}
      onCancel={endEditing}
    />
  ) : (
    <ListItem
      button
      divider
      dense
      disabled={isFetching}
      onClick={() => setFieldValue("correctAnswer", choiceIndex)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          color="primary"
          checked={isCorrectAnswer}
          className={classes.trueAnswer}
          disableRipple
          classes={{
            checked: classes.checked
          }}
        />
      </ListItemIcon>
      <ListItemText primary={`${CHOICE_KEYS[choiceIndex]}) ${choice}`} />
      <ListItemSecondaryAction>
        <EditableChoiceListItemMenu
          renderTrigger={({ onClick }) => (
            <IconButton disabled={isFetching} onClick={onClick}>
              <MoreVertIcon />
            </IconButton>
          )}
          onEditClick={() => onSelectChoice(choiceIndex)}
          onDeleteClick={() => {
            const updatedChoices = produce(choices, draft => {
              draft.splice(choiceIndex, 1);
            });
            setFieldValue("choices", updatedChoices);

            if (isCorrectAnswer) {
              setFieldValue("correctAnswer", -1);
            } else if (correctAnswer > choiceIndex) {
              setFieldValue("correctAnswer", correctAnswer - 1);
            }
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default connect(EditableChoiceList);
