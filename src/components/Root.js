import React from "react";
import { CssBaseline, Box, Container } from "@material-ui/core";
import Space from "components/Space";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import FullScreen from "react-full-screen";
import { toggleFullscreen } from "actions";
import App from "./App";
import useAuthStateListener from "hooks/useAuthStateListener";

const Root = () => {
  const dispatch = useDispatch();

  const isFullscreen = useSelector(state =>
    selectors.selectIsFullscreen(state)
  );

  useAuthStateListener();

  return (
    <FullScreen
      enabled={isFullscreen}
      onChange={enabled => dispatch(toggleFullscreen(enabled))}
    >
      <CssBaseline />
      <Box minWidth={800}>
        <Space>
          <Container maxWidth="lg">
            <App />
          </Container>
        </Space>
      </Box>
    </FullScreen>
  );
};

export default Root;