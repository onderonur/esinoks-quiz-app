import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  isFullscreen: false
};

const quiz = createReducer(initialState, {
  [actionTypes.TOGGLE_FULLSCREEN]: (state, { isFullscreen }) => {
    state.isFullscreen = isFullscreen;
  }
});

export default quiz;

export const selectors = {
  selectIsFullscreen: state => state.isFullscreen
};
