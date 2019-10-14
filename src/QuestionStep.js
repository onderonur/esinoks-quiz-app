import React, { useState } from "react";
import { Circle } from "react-konva";

function QuestionStep({ x, y }) {
  const [hover, setHover] = useState(false);

  return (
    <Circle
      radius={40}
      x={x}
      y={y}
      fill="#ff0000"
      strokeWidth={hover ? 5 : 0}
      stroke="yellow"
      onClick={() => alert("deneme")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
}

export default QuestionStep;
