import React from "react";
import { makeStyles } from "@material-ui/core";
import parse from "html-react-parser";

const useStyles = makeStyles(theme => ({
  questionBody: {
    ...theme.typography.body1,
    whiteSpace: "pre-wrap",
    "& p": {
      margin: 0
    }
  }
}));

const RawHtmlDiv = ({ html }) => {
  const classes = useStyles();

  return <div className={classes.questionBody}>{parse(html)}</div>;
};

export default RawHtmlDiv;
