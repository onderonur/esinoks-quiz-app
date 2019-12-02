import { createAction } from "@reduxjs/toolkit";

export const navigate = createAction(
  "routing/navigate",
  (history, pathname, historyAction) => ({
    payload: {
      history,
      pathname,
      historyAction
    }
  })
);

export const navigateTo404 = history =>
  navigate(history, "/not-found-404", "replace");
