import React from "react";
import QuizGameQuestionListItem from "./QuizGameQuestionListItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import LoadingIndicator from "components/LoadingIndicator";
import BaseList from "components/BaseList";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import useDetectMobile from "hooks/useDetectMobile";

const useStyles = makeStyles(theme => ({
  horizontalList: {
    display: "flex",
    overflow: "auto",
    padding: theme.spacing(0, 1),
    "& > li": {
      width: "auto"
    }
  }
}));

const QuizGameQuestionList = () => {
  const isMobile = useDetectMobile();
  const classes = useStyles();
  const { quizId } = useParams();
  const { isFetching } = useSelector(state =>
    selectors.selectAsyncInfoQuizQuestions(state, quizId)
  );
  const quizQuestionIds = useSelector(state =>
    selectors.selectQuizQuestionIds(state, quizId)
  );

  return (
    // We don't want to show the list when it is in "isFetching" state.
    // If we use the "loading" prop of "BaseList", it shows the current
    // items, and a spinner underneath them.
    // So instead of that, we used a basit "LoadingIndicator" at the root.
    <LoadingIndicator loading={isFetching}>
      <BaseList
        className={clsx(isMobile && classes.horizontalList)}
        data={quizQuestionIds}
        renderItem={(questionId, i) => (
          <QuizGameQuestionListItem
            key={questionId}
            questionId={questionId}
            index={i}
          />
        )}
      />
    </LoadingIndicator>
  );
};

export default QuizGameQuestionList;
