import React from "react";
import { Rect } from "react-konva";

function QuestionStep({ x, y }) {
  return (
    <Rect x={x} y={y} width={50} height={50} fill="#ff0000" shadowBlur={5} />
  );
}

export default QuestionStep;
