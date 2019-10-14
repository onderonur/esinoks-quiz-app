import React, { useState, useEffect } from "react";
import { Image as KonvaImage } from "react-konva";
import astronautPng from "./assets/astronaut.png";

const image = new Image();
image.src = astronautPng;

function Astronaut() {
  const [astronaut, setAstronaut] = useState(null);

  useEffect(() => {
    image.onload = () => {
      setAstronaut(image);
    };
  }, []);

  return <KonvaImage image={astronaut} width={120} height={120} />;
}

export default Astronaut;
