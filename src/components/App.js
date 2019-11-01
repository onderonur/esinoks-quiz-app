import React from "react";
import { Box } from "@material-ui/core";
import FullscreenButton from "./FullscreenButton";
import RestartQuizButton from "./RestartQuizButton";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import Routes from "./Routes";
import UserButton from "./UserButton";
import useListenAuthState from "hooks/useListenAuthState";
import LoadingIndicator from "./LoadingIndicator";

const App = () => {
  const isFetching = useListenAuthState();

  return (
    <LoadingIndicator loading={isFetching}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <SignInWithGoogleButton />
        <RestartQuizButton />
        <FullscreenButton />
        <UserButton />
      </Box>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
