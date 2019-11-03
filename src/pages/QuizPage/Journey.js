import React from "react";
import { Box } from "@material-ui/core";
import Astronaut from "./Astronaut";
import Earth from "./Earth";
import Hearts from "./Hearts";

const Journey = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        height={140}
        position="relative"
        marginY={2}
      >
        <Astronaut />
        <Earth />
      </Box>
      <Hearts />
    </>
  );
};

export default Journey;
