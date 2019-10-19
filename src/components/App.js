import React from "react";
import { Box } from "@material-ui/core";
import FullscreenButton from "./FullscreenButton";
import RestartQuizButton from "./RestartQuizButton";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import Routes from "./Routes";
import UserButtonMenu from "./UserButtonMenu";

const App = () => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <SignInWithGoogleButton />
        <RestartQuizButton />
        <FullscreenButton />
        <UserButtonMenu />
      </Box>
      <Routes />
    </>
  );
};

export default App;
