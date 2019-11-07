import React from "react";
import parse from "html-react-parser";

const RawHtml = ({ html }) => {
  return <div>{parse(html)}</div>;
};

export default RawHtml;
