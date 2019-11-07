import React from "react";
import { Box } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";
import { fade } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import "react-quill/dist/quill.snow.css";

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
          bgcolor={fade(grey[400], 0.6)}
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
