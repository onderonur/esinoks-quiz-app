import React from "react";
import { CircularProgress, Box } from "@material-ui/core";

const LoadingIndicator = ({ loading, children, size = 48 }) => {
  return loading ? (
    <Box display="flex" justifyContent="center" my={2} flexGrow={1}>
      <CircularProgress size={size} color="secondary" />
    </Box>
  ) : (
    children || null
  );
};

export default LoadingIndicator;
