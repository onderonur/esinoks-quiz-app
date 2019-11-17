import createReducer from "./higherOrderReducers/createReducer";
import * as actions from "actions";

const initialState = {
  isLoggedIn: undefined,
  authUser: null
};

const authUser = createReducer(initialState, {
  [actions.LISTEN_AUTH_STATE._SUCCEEDED]: (state, action) => {
    const { authUser } = action;
    state.isLoggedIn = !!authUser;
    state.authUser = authUser;
  },
  [actions.LISTEN_AUTH_STATE._FAILED]: state => {
    state.isLoggedIn = false;
    state.authUser = null;
  }
});

export default authUser;

export const selectors = {
  selectIsLoggedIn: state => state.isLoggedIn,
  selectAuthUser: state => state.authUser
};
