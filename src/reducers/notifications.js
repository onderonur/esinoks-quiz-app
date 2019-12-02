import * as actions from "actions";
import { removeItemFromArrayMutation } from "utils";
import { createReducer } from "@reduxjs/toolkit";

const initialState = [];

const enqueueSnackbar = (state, action) => {
  const { payload } = action;
  state.push(payload);
};

const closeSnackbar = (state, action) => {
  const { payload } = action;
  const { dismissAll, key } = payload;
  state.forEach(notification => {
    if (dismissAll || notification.key === key) {
      notification.dismissed = true;
    }
  });
};

const removeSnackbar = (state, action) => {
  const { payload } = action;
  const { key } = payload;
  const removedNotification = state.find(
    notification => notification.key === key
  );
  removeItemFromArrayMutation(state, removedNotification);
};

const notifications = createReducer(initialState, {
  [actions.enqueueSnackbar]: enqueueSnackbar,
  [actions.closeSnackbar]: closeSnackbar,
  [actions.removeSnackbar]: removeSnackbar
});

export default notifications;

export const selectors = {
  selectNotifications: state => state
};
