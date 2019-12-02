import React from "react";
import { Typography } from "@material-ui/core";

const APIErrorMessage = ({ error }) => {
  return error ? (
    <Typography color="error">{error.message || "Unknown error"}</Typography>
  ) : null;
};

export default APIErrorMessage;
