import React, { useState, useEffect } from "react";
import Fullscreen from "react-full-screen";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { IconButton, CssBaseline } from "@material-ui/core";
import Space from "./Space";
import { Stage, Layer } from "react-konva";
import QuestionStep from "./QuestionStep";
import Astronaut from "./Astronaut";

const questionCount = 10;
const questions = Array.from(Array(questionCount));

// lets think you want to make all your objects visible in
// 700x700 scene
const CANVAS_VIRTUAL_WIDTH = 700;
const CANVAS_VIRTUAL_HEIGHT = 700;

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

  useEffect(() => {
    function checkSize() {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    }

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // now you may want to make it visible even on small screens
  // we can just scale it
  const scale = Math.min(
    stageWidth / CANVAS_VIRTUAL_WIDTH,
    stageHeight / CANVAS_VIRTUAL_HEIGHT
  );

  return (
    <>
      <CssBaseline />
      <Fullscreen
        enabled={isFullscreen}
        onChange={enabled => setIsFullscreen(enabled)}
      >
        <Space>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setIsFullscreen(state => !state)}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </div>

          <Stage
            width={stageWidth}
            height={stageHeight}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer x={120}>
              {questions.map((question, i) => (
                <QuestionStep key={i} x={i * (80 + 40)} y={300} />
              ))}
            </Layer>
            <Layer>
              <Astronaut />
            </Layer>
          </Stage>
        </Space>
      </Fullscreen>
    </>
  );
}

export default App;
