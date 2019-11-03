import React from "react";
import { DialogContent } from "@material-ui/core";

const BaseDialogContent = ({ dividers = true, ...rest }) => {
  return <DialogContent dividers={dividers} {...rest} />;
};

export default BaseDialogContent;
