import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import {
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Box,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import QuizQuestionListItemMenu from "./QuizQuestionListItemMenu";
import RawHtmlDiv from "components/RawHtmlDiv";

const useStyles = makeStyles(theme => ({
  orderNo: {
    marginRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  }
}));

const QuizQuestionListItem = ({ index, quizId, questionId }) => {
  const classes = useStyles();
  const question = useSelector(state =>
    selectors.selectQuestionById(state, questionId)
  );
  const dialogProps = useSelector(state =>
    selectors.selectQuestionFormDialogProps(state)
  );
  const { questionId: selectedQuestionId } = dialogProps;

  return (
    <ListItem dense divider selected={questionId === selectedQuestionId}>
      <ListItemText
        primary={
          <Box display="flex">
            <Typography className={classes.orderNo} variant="body2">
              {index + 1}.
            </Typography>
            <RawHtmlDiv html={question.body} />
          </Box>
        }
      />
      <ListItemSecondaryAction>
        <QuizQuestionListItemMenu
          quizId={quizId}
          questionId={questionId}
          renderTrigger={({ onClick }) => (
            <IconButton size="small" onClick={onClick}>
              <MoreVertIcon />
            </IconButton>
          )}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default QuizQuestionListItem;
