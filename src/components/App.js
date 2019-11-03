import React from "react";
import Routes from "./Routes";
import useListenAuthState from "hooks/useListenAuthState";
import LoadingIndicator from "./LoadingIndicator";

const App = () => {
  const isFetching = useListenAuthState();

  return (
    <LoadingIndicator loading={isFetching}>
      <Routes />
    </LoadingIndicator>
  );
};

export default App;
