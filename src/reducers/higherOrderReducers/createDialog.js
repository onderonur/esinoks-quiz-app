import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false
};

const createDialog = (openType, closeTypes) => {
  const handlers = {};

  handlers[openType] = (state, action) => {
    state.isOpen = true;
    const { payload } = action;
    const { dialogProps } = payload;
    if (dialogProps) {
      const dialogPropKeys = Object.keys(dialogProps);
      dialogPropKeys.forEach(key => {
        state[key] = dialogProps[key];
      });
    }
  };

  closeTypes.forEach(type => {
    handlers[type] = () => initialState;
  });

  return createReducer(initialState, handlers);
};

export default createDialog;

export const selectors = {
  selectDialogProps: state => state
};
