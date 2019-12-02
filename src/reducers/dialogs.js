import * as actions from "actions";
import createDialog, * as fromCreateDialog from "./higherOrderReducers/createDialog";
import { combineReducers } from "redux";

const dialogs = combineReducers({
  questionForm: createDialog(actions.openQuestionFormDialog, [
    actions.closeQuestionFormDialog,
    actions.createQuestion.succeeded,
    actions.updateQuestion.succeeded
  ]),
  signIn: createDialog(actions.openSignInDialog, [
    actions.closeSignInDialog,
    actions.socialSignIn.succeeded
  ])
});

export default dialogs;

const dialogSelectors = fromCreateDialog.selectors;

export const selectors = {
  selectQuestionFormDialogProps: state =>
    dialogSelectors.selectDialogProps(state.questionForm),
  selectSignInDialogProps: state =>
    dialogSelectors.selectDialogProps(state.signIn)
};
