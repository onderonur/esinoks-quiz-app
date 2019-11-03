import React, { useCallback } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { useParams } from "react-router-dom";

export const TOTAL_HEARTS_COUNT = 3;

const Hearts = () => {
  const { quizId } = useParams();
  const wrongGivenAnswerCount = useSelector(state =>
    selectors.selectWrongGivenAnswerCountByQuizId(state, quizId)
  );

  const remainingHearts = TOTAL_HEARTS_COUNT - wrongGivenAnswerCount;

  const renderHearts = useCallback(() => {
    const hearts = [];
    for (let i = 0; i < remainingHearts; i++) {
      hearts.push(<FavoriteIcon key={i} color="secondary" fontSize="large" />);
    }
    return hearts.map(heart => heart);
  }, [remainingHearts]);

  return <Box display="flex">{renderHearts()}</Box>;
};

export default Hearts;
