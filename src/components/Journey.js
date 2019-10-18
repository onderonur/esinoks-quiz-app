import React from "react";
import { Box } from "@material-ui/core";
import Astronaut from "./Astronaut";
import Earth from "./Earth";

const Journey = () => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height={200}
      position="relative"
    >
      <Astronaut />
      <Earth />
    </Box>
  );
};

export default Journey;
