import React from "react";
import parse from "html-react-parser";

// TODO: Delete this component if you will not use it later.
const RawHtml = ({ html }) => {
  return <div>{parse(html)}</div>;
};

export default RawHtml;
