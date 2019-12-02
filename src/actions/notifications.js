import { createAction } from "@reduxjs/toolkit";

export const enqueueSnackbar = createAction(
  "notifications/enqueue",
  (message, options = {}) => {
    const key = options.key || Date.now() + Math.random();

    return {
      payload: {
        key,
        message,
        options: {
          ...options,
          key
        }
      }
    };
  }
);

export const closeSnackbar = createAction("notifications/close", key => ({
  payload: {
    dismissAll: !key, // dismiss all if no key has been defined,
    key
  }
}));

export const removeSnackbar = createAction("notifications/remove", key => ({
  payload: {
    key
  }
}));
