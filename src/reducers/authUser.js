import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";

const initialState = null;

const { successType: LISTEN_AUTH_STATE_SUCCESS } = getFetchActionTypes(
  actionTypes.LISTEN_AUTH_STATE
);

const authUser = createReducer(initialState, {
  [LISTEN_AUTH_STATE_SUCCESS]: (state, { authUser }) => authUser
});

export default authUser;

export const selectors = {
  selectAuthUser: state => state
};
