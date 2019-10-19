import React from "react";
import Link from "@material-ui/core/Link";
import RouterLink from "./RouterLink";

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const LinkWithForwardRef = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

// TODO: Delete this file if it is not used

const BaseLink = props => {
  return <Link component={LinkWithForwardRef} {...props} />;
};

export default BaseLink;
