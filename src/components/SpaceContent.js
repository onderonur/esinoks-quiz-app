import React from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import StartScreen from "components/StartScreen";
import QuestionGridList from "./QuestionGridList";
import QuestionDialog from "./QuestionDialog";
import Journey from "./Journey";
import FullscreenButton from "./FullscreenButton";
import RestartQuizButton from "./RestartQuizButton";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import SignOutButton from "./SignOutButton";

const SpaceContent = () => {
  const isPlaying = useSelector(state => selectors.selectIsPlaying(state));

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <SignInWithGoogleButton />
        <SignOutButton />
        <RestartQuizButton />
        <FullscreenButton />
      </Box>
      {isPlaying ? (
        <>
          <Journey />
          <QuestionGridList />
          <QuestionDialog />
        </>
      ) : (
        <StartScreen />
      )}
    </>
  );
};

export default SpaceContent;
