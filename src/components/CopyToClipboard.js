import React, { useState, useCallback } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import copy from "copy-to-clipboard";

const CopyToClipboard = ({ children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const onCopy = useCallback(content => {
    copy(content);
    setIsTooltipVisible(true);
  }, []);

  return (
    <Tooltip
      open={isTooltipVisible}
      title={"Copied to clipboard!"}
      leaveDelay={800}
      onClose={() => setIsTooltipVisible(false)}
    >
      {children({ copy: onCopy })}
    </Tooltip>
  );
};

export default CopyToClipboard;
