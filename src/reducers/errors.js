import { combineReducers } from "redux";
import createError from "./higherOrderReducers/createError";
import * as actions from "actions";

const errors = combineReducers({
  updateQuestion: createError(actions.updateQuestion),
  socialSignIn: createError(actions.socialSignIn)
});

export default errors;

export const selectors = {
  selectErrorUpdateQuestion: state => state.updateQuestion,
  selectErrorSocialSignIn: state => state.socialSignIn
};
