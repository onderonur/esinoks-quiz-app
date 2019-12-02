import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, makeStyles } from "@material-ui/core";
import { restartQuiz } from "actions";
import ReplayIcon from "@material-ui/icons/Replay";
import clsx from "clsx";
import useConfirmDialog from "hooks/useConfirmDialog";

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.grey[100]
  }
}));

const RestartQuizButton = ({ quizId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const confirm = useConfirmDialog();

  const handleClick = () => {
    confirm({
      title: "Quiz'i Tekrarla?",
      description: "Quiz en baştan başlatılacaktır.",
      confirmText: "Tekrarla",
      onConfirm: () => dispatch(restartQuiz(quizId))
    });
  };

  return (
    <IconButton
      color="primary"
      className={clsx(classes.button)}
      onClick={handleClick}
    >
      <ReplayIcon />
    </IconButton>
  );
};

export default RestartQuizButton;
