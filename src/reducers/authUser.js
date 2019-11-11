import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = {
  isLoggedIn: undefined,
  authUser: null
};

const {
  successType: LISTEN_AUTH_STATE_SUCCESS,
  errorType: LISTEN_AUTH_STATE_ERROR
} = getFetchActionTypes(actionTypes.LISTEN_AUTH_STATE);

const authUser = createReducer(initialState, {
  [LISTEN_AUTH_STATE_SUCCESS]: (state, { authUser }) => {
    state.isLoggedIn = !!authUser;
    state.authUser = authUser;
  },
  [LISTEN_AUTH_STATE_ERROR]: state => {
    state.isLoggedIn = false;
    state.authUser = null;
  }
});

export default authUser;

export const selectors = {
  selectIsLoggedIn: state => state.isLoggedIn,
  selectAuthUser: state => state.authUser
};
