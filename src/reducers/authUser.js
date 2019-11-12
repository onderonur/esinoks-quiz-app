import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  isLoggedIn: undefined,
  authUser: null
};

const authUser = createReducer(initialState, {
  [getFetchActionTypes(actionTypes.LISTEN_AUTH_STATE).successType]: (
    state,
    { authUser }
  ) => {
    state.isLoggedIn = !!authUser;
    state.authUser = authUser;
  },
  [getFetchActionTypes(actionTypes.LISTEN_AUTH_STATE).errorType]: state => {
    state.isLoggedIn = false;
    state.authUser = null;
  }
});

export default authUser;

export const selectors = {
  selectIsLoggedIn: state => state.isLoggedIn,
  selectAuthUser: state => state.authUser
};
