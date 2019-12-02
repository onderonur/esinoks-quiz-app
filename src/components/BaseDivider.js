import React from "react";
import { Box, Divider } from "@material-ui/core";

const BaseDivider = ({ dense, className }) => {
  return (
    <Box marginY={dense ? 0 : 2} className={className}>
      <Divider />
    </Box>
  );
};

export default BaseDivider;
