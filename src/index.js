import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "store";
import Root from "components/Root";
import { BrowserRouter } from "react-router-dom";
import rootSaga from "sagas";
import { SnackbarProvider } from "notistack";
import ConfirmDialogProvider from "components/ConfirmDialogProvider";
import ErrorBoundary from "components/ErrorBoundary";

// TODO: Will delete unused files and functions if there are any.

store.runSaga(rootSaga);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <ConfirmDialogProvider>
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </ConfirmDialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
