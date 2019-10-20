import createReducer from "./createReducer";

const initialState = {
  isOpen: false,
  dialogProps: {}
};

const createDialog = (openTypes, closeTypes) => {
  const handlers = {};
  openTypes.forEach(type => {
    handlers[type] = (state, { dialogProps }) => {
      state.isOpen = true;
      state.dialogProps = dialogProps;
    };
  });

  closeTypes.forEach(type => {
    handlers[type] = () => initialState;
  });

  return createReducer(initialState, handlers);
};

export default createDialog;

export const selectors = {
  selectIsOpen: state => state.isOpen,
  selectDialogProps: state => state.dialogProps
};
