import React from "react";
import StarfieldAnimation from "react-starfield-animation";
import starfieldJpg from "assets/starfield.jpg";

const Space = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${starfieldJpg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <StarfieldAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      />
      {children}
    </div>
  );
};

export default Space;
