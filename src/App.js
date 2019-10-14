import React, { useState, useEffect } from "react";
import Fullscreen from "react-full-screen";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { IconButton, CssBaseline } from "@material-ui/core";
import Space from "./Space";
import { Stage, Layer, Rect } from "react-konva";
import QuestionStep from "./QuestionStep";

const questionCount = 10;

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stateWidth, setStageWidth] = useState(window.innerWidth);

  const questions = Array.from(Array(10));

  useEffect(() => {
    function checkSize() {
      setStageWidth(window.innerWidth);
    }

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // lets think you want to make all your objects visible in
  // 700x700 scene
  const CANVAS_VIRTUAL_WIDTH = 700;
  const CANVAS_VIRTUAL_HEIGHT = 700;

  // now you may want to make it visible even on small screens
  // we can just scale it
  const scale = Math.min(
    window.innerWidth / CANVAS_VIRTUAL_WIDTH,
    window.innerHeight / CANVAS_VIRTUAL_HEIGHT
  );

  return (
    <>
      <CssBaseline />
      <Fullscreen
        enabled={isFullscreen}
        onChange={enabled => setIsFullscreen(enabled)}
      >
        <Space
          width={window.innerWidth}
          height={window.innerHeight}
          scaleX={scale}
          scaleY={scale}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setIsFullscreen(state => !state)}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </div>
          <Stage width={stateWidth} height={window.innerHeight}>
            <Layer>
              {questions.map((question, i) => (
                <QuestionStep key={i} x={i * 80} y={20} />
              ))}
            </Layer>
          </Stage>
        </Space>
      </Fullscreen>
    </>
  );
}

export default App;
