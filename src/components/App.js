import React from "react";
import { Box } from "@material-ui/core";
import FullscreenButton from "./FullscreenButton";
import RestartQuizButton from "./RestartQuizButton";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import Routes from "./Routes";
import UserButtonMenu from "./UserButtonMenu";
import useAuthStateListener from "hooks/useAuthStateListener";
import LoadingIndicator from "./LoadingIndicator";

const App = () => {
  const initialized = useAuthStateListener();

  return (
    <LoadingIndicator loading={!initialized}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <SignInWithGoogleButton />
        <RestartQuizButton />
        <FullscreenButton />
        <UserButtonMenu />
      </Box>
        <Routes />
    </LoadingIndicator>
  );
};

export default App;
