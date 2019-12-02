import React, { useCallback } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Box, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { Colors } from "theme";

const useStyles = makeStyles(theme => ({
  heart: {
    color: Colors.red
  }
}));

const Hearts = ({ quizId }) => {
  const classes = useStyles();
  const { totalHearts, remainingHearts } = useSelector(state =>
    selectors.selectQuizGameInfo(state, quizId)
  );

  const renderHearts = useCallback(() => {
    const hearts = [];
    for (let i = 0; i < totalHearts; i++) {
      const IconComponent =
        i < remainingHearts ? FavoriteIcon : FavoriteBorderIcon;
      hearts.push(
        <IconComponent key={i} className={classes.heart} fontSize="large" />
      );
    }
    return hearts.map(heart => heart);
  }, [totalHearts, remainingHearts, classes.heart]);

  return <Box display="flex">{renderHearts()}</Box>;
};

export default Hearts;
