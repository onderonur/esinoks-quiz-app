import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const DEFAULT_ITEMS = [];

const defaultKeyExtractor = id => id;

const useStyles = makeStyles(theme => ({
  flexList: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridGap: ({ spacing }) => theme.spacing(spacing),
    gridTemplateColumns: ({ minItemWidth }) =>
      `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`
  }
}));

const BaseGridList = ({
  items = DEFAULT_ITEMS,
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 120,
  keyExtractor = defaultKeyExtractor,
  listEmptyMessage = "Nothing has been found"
}) => {
  const classes = useStyles({ minItemWidth, spacing });

  const extractItemKey = (item, index) => {
    return typeof keyExtractor === "string"
      ? item[keyExtractor]
      : keyExtractor(item, index);
  };

  return !items.length && !loading ? (
    typeof listEmptyMessage === "string" ? (
      <Typography>{listEmptyMessage}</Typography>
    ) : (
      listEmptyMessage
    )
  ) : (
    <ul className={classes.flexList}>
      {items.map((item, index) => (
        <li key={extractItemKey(item, index)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
};

export default BaseGridList;
