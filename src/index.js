import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import configureStore from "store";
import FirebaseProvider from "components/FirebaseProvider";
import Root from "components/Root";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <FirebaseProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </FirebaseProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
