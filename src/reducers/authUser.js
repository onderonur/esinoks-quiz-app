import * as actions from "actions";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: undefined,
  authUser: null
};

const authStateChanged = (state, action) => {
  const { payload } = action;
  const { authUser } = payload;
  state.isSignedIn = !!authUser;
  state.authUser = authUser;
};

const signOut = (state, action) => {
  state.isSignedIn = false;
  state.authUser = null;
};

const authUser = createReducer(initialState, {
  [actions.listenAuthState.succeeded]: authStateChanged,
  [actions.listenAuthState.failed]: signOut,
  [actions.socialSignIn.failed]: signOut
});

export default authUser;

export const selectors = {
  selectisSignedIn: state => state.isSignedIn,
  selectAuthUser: state => state.authUser
};
