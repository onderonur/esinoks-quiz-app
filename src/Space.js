import React from "react";
import StarfieldAnimation from "react-starfield-animation";
import starfieldJpg from "./assets/starfield.jpg";
import { Box } from "@material-ui/core";

const Space = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${starfieldJpg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <StarfieldAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      />
      <Box component="main">{children}</Box>
    </div>
  );
};

export default Space;
