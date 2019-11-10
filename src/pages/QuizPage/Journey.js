import React from "react";
import { Box } from "@material-ui/core";
import Astronaut from "./Astronaut";
import Earth from "./Earth";
import Hearts from "./Hearts";
import useDetectMobile from "hooks/useDetectMobile";

const Journey = () => {
  const isMobile = useDetectMobile();

  return (
    <Box marginY={2}>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        position="relative"
        height={isMobile ? 100 : 140}
      >
        <Astronaut />
        <Earth />
      </Box>
      <Hearts />
    </Box>
  );
};

export default Journey;
