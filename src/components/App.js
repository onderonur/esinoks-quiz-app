import React from "react";
import { CssBaseline, Container, Box } from "@material-ui/core";
import Space from "components/Space";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import StartScreen from "components/StartScreen";
import QuestionGridList from "./QuestionGridList";
import QuestionDialog from "./QuestionDialog";
import Journey from "./Journey";

const App = () => {
  const isPlaying = useSelector(state => selectors.selectIsPlaying(state));

  return (
    <>
      <CssBaseline />
      <Box minWidth={1200}>
        <Space>
          <Container maxWidth="lg">
            {isPlaying ? (
              <>
                <Journey />
                <QuestionGridList />
                <QuestionDialog />
              </>
            ) : (
              <StartScreen />
            )}
          </Container>
        </Space>
      </Box>
    </>
  );
};

export default App;
