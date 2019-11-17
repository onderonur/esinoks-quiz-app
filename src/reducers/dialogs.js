import * as actions from "actions";
import createDialog, * as fromCreateDialog from "./higherOrderReducers/createDialog";
import { combineReducers } from "redux";

const dialogs = combineReducers({
  questionForm: createDialog(actions.OPEN_QUESTION_FORM_DIALOG, [
    actions.CLOSE_QUESTION_FORM_DIALOG,
    actions.CREATE_QUESTION._SUCCEEDED,
    actions.UPDATE_QUESTION._SUCCEEDED
  ]),
  deleteQuizConfirmation: createDialog(actions.DELETE_QUIZ._BASE, [
    actions.DELETE_QUIZ._CANCELLED,
    actions.DELETE_QUIZ._SUCCEEDED
  ]),
  deleteQuestionConfirmation: createDialog(actions.DELETE_QUESTION._BASE, [
    actions.DELETE_QUESTION._CANCELLED,
    actions.DELETE_QUESTION._SUCCEEDED
  ]),
  restartQuizConfirmation: createDialog(actions.RESTART_QUIZ._BASE, [
    actions.RESTART_QUIZ._CANCELLED,
    actions.RESTART_QUIZ._CONFIRMED
  ]),
  shareQuizCode: createDialog(actions.SHARE_QUIZ_CODE._BASE, [
    actions.SHARE_QUIZ_CODE._SUCCEEDED
  ])
});

export default dialogs;

export const selectors = {
  selectQuestionFormDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(state.questionForm),
  selectDeleteQuizConfirmationDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(state.deleteQuizConfirmation),
  selectDeleteQuestionConfirmationDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(
      state.deleteQuestionConfirmation
    ),
  selectRestartQuizConfirmationDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(state.restartQuizConfirmation),
  selectShareQuizCodeDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(state.shareQuizCode)
};
