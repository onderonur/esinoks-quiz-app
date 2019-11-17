import React from "react";
import { Box } from "@material-ui/core";
import Astronaut from "./Astronaut";
import Earth from "./Earth";
import Hearts from "./Hearts";
import { useParams } from "react-router-dom";
import useDetectMobile from "hooks/useDetectMobile";
import QuizGameMessage from "./QuizGameMessage";

const Journey = () => {
  const { quizId } = useParams();
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
        <Astronaut quizId={quizId} />
        <Earth />
        <QuizGameMessage quizId={quizId} />
      </Box>
      <Hearts quizId={quizId} />
    </Box>
  );
};

export default Journey;
