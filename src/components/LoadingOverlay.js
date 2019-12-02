import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";
import { fade } from "@material-ui/core/styles";
import { Colors } from "theme";

const LoadingOverlay = ({ loading, children }) => {
  return (
    <Box position="relative">
      {children}
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor={fade(Colors.grey, 0.6)}
          display="flex"
          alignItems="center"
        >
          <LoadingIndicator loading={true} />
        </Box>
      )}
    </Box>
  );
};

export default LoadingOverlay;
