import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = null;

const authUser = createReducer(initialState, {
  [actionTypes.AUTH_STATE_CHANGED]: (state, { authUser }) => authUser
});

export default authUser;

export const selectors = {
  selectAuthUser: state => state
};
