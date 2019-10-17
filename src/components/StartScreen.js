import React from "react";
import { Button, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { startQuiz } from "actions";

const StartScreen = () => {
  const dispatch = useDispatch();

  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(startQuiz())}
      >
        Start
      </Button>
    </Box>
  );
};

export default StartScreen;
