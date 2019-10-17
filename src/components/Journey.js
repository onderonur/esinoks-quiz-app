import React from "react";
import { Box } from "@material-ui/core";
import Astronaut from "./Astronaut";
import Earth from "./Earth";

const Journey = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={10}
    >
      <Astronaut />
      <Earth />
    </Box>
  );
};

export default Journey;
