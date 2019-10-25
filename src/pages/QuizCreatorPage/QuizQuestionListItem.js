import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { openQuestionFormDialog, deleteQuestion } from "actions";
import {
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Box,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  orderNo: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

const QuizQuestionListItem = ({ index, quizId, questionId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const question = useSelector(state =>
    selectors.selectQuestionById(state, questionId)
  );
  const dialogProps = useSelector(state =>
    selectors.selectQuestionFormDialogProps(state)
  );
  const { questionId: selectedQuestionId } = dialogProps;

  return (
    <ListItem
      dense
      button
      divider
      selected={questionId === selectedQuestionId}
      onClick={() => dispatch(openQuestionFormDialog(quizId, question.id))}
    >
      <ListItemText
        primary={
          <Box display="flex">
            <Typography className={classes.orderNo} variant="body2">
              {index + 1}.{" "}
            </Typography>
            <Typography variant="body2">{question.text}</Typography>
          </Box>
        }
        primaryTypographyProps={{
          style: {
            whiteSpace: "pre-wrap"
          }
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => dispatch(deleteQuestion(quizId, questionId))}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuizQuestionListItem;
