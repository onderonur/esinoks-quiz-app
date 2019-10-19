import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  isPlaying: false, // TODO: Gerek kalmadı buna
  isFullscreen: false
};

const quiz = createReducer(initialState, {
  [actionTypes.START_QUIZ]: state => {
    state.isPlaying = true;
  },
  [actionTypes.TOGGLE_FULLSCREEN]: (state, { isFullscreen }) => {
    state.isFullscreen = isFullscreen;
  }
});

export default quiz;

export const selectors = {
  selectIsPlaying: state => state.isPlaying,
  selectIsFullscreen: state => state.isFullscreen
};
