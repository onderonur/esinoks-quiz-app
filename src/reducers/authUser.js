import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchTypes } from "utils";

const initialState = {
  isLoggedIn: undefined,
  authUser: null
};

const authUser = createReducer(initialState, {
  [getFetchTypes(actionTypes.LISTEN_AUTH_STATE).succeeded]: (state, action) => {
    const { authUser } = action;
    state.isLoggedIn = !!authUser;
    state.authUser = authUser;
  },
  [getFetchTypes(actionTypes.LISTEN_AUTH_STATE).failed]: state => {
    state.isLoggedIn = false;
    state.authUser = null;
  }
});

export default authUser;

export const selectors = {
  selectIsLoggedIn: state => state.isLoggedIn,
  selectAuthUser: state => state.authUser
};
