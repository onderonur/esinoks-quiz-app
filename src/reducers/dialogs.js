import * as actionTypes from "constants/actionTypes";
import { getFetchTypes } from "utils";
import createDialog, * as fromCreateDialog from "./higherOrderReducers/createDialog";
import { combineReducers } from "redux";

const dialogs = combineReducers({
  questionForm: createDialog(actionTypes.OPEN_QUESTION_FORM_DIALOG, [
    actionTypes.CLOSE_QUESTION_FORM_DIALOG,
    getFetchTypes(actionTypes.CREATE_QUESTION).succeeded,
    getFetchTypes(actionTypes.UPDATE_QUESTION).succeeded
  ]),
  deleteQuizConfirmation: createDialog(actionTypes.DELETE_QUIZ, [
    actionTypes.DELETE_QUIZ_CANCELLED,
    getFetchTypes(actionTypes.DELETE_QUIZ_CONFIRMED).succeeded
  ]),
  deleteQuestionConfirmation: createDialog(actionTypes.DELETE_QUESTION, [
    actionTypes.DELETE_QUESTION_CANCELLED,
    getFetchTypes(actionTypes.DELETE_QUESTION_CONFIRMED).succeeded
  ]),
  restartQuizConfirmation: createDialog(actionTypes.RESTART_QUIZ, [
    actionTypes.RESTART_QUIZ_CANCELLED,
    actionTypes.RESTART_QUIZ_CONFIRMED
  ]),
  shareQuizCode: createDialog(actionTypes.SHARE_QUIZ_CODE, [
    actionTypes.SHARE_QUIZ_CODE_COMPLETED
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
