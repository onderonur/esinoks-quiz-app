import createReducer from "./createReducer";

const initialState = {
  isOpen: false
};

const createDialog = (openTypes, closeTypes) => {
  const handlers = {};
  openTypes.forEach(type => {
    handlers[type] = (state, { dialogProps }) => {
      state.isOpen = true;
      const dialogPropKeys = Object.keys(dialogProps);
      dialogPropKeys.forEach(key => {
        state[key] = dialogProps[key]
      });
    };
  });

  closeTypes.forEach(type => {
    handlers[type] = () => initialState;
  });

  return createReducer(initialState, handlers);
};

export default createDialog;

export const selectors = {
  selectDialogProps: state => state
};
