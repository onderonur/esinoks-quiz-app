import React from "react";
import sanitizeHtml from "sanitize-html";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    wordWrap: "break-word",
    "& img": {
      maxWidth: "100%"
    },
    "& p": theme.typography.body1,
    "& h1": theme.typography.h1,
    "& h2": theme.typography.h2,
    "& h3": theme.typography.h3,
    "& h4": theme.typography.h4,
    "& h5": theme.typography.h5,
    "& h6": theme.typography.h6
  }
}));

const SanitizedHtml = ({ html }) => {
  const classes = useStyles();
  const sanitized = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "span"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      p: ["style"],
      strong: ["style"]
    }
  });

  return (
    <div
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
};

export default SanitizedHtml;
