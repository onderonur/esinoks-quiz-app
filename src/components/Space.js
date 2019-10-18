import React from "react";
import StarfieldAnimation from "react-starfield-animation";

const Space = ({ children }) => {
  return (
    <>
      <StarfieldAnimation
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }}
      />
      {children}
    </>
  );
};

export default Space;
