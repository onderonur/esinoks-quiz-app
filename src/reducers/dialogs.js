import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";
import createDialog, * as fromCreateDialog from "./higherOrderReducers/createDialog";
import { combineReducers } from "redux";

const { successType: CREATE_QUIZ_SUCCESS } = getFetchActionTypes(
  actionTypes.CREATE_QUIZ
);

const { successType: DELETE_QUIZ_CONFIRMED_SUCCESS } = getFetchActionTypes(
  actionTypes.DELETE_QUIZ_CONFIRMED
);

const dialogs = combineReducers({
  quizForm: createDialog(
    [actionTypes.OPEN_QUIZ_FORM_DIALOG],
    [actionTypes.CLOSE_QUIZ_FORM_DIALOG, CREATE_QUIZ_SUCCESS]
  ),
  deleteQuizConfirmation: createDialog(
    [actionTypes.DELETE_QUIZ],
    [actionTypes.DELETE_QUIZ_CANCELLED, DELETE_QUIZ_CONFIRMED_SUCCESS]
  ),
  restartQuizConfirmation: createDialog(
    [actionTypes.RESTART_QUIZ],
    [actionTypes.RESTART_QUIZ_CANCELLED, actionTypes.RESTART_QUIZ_CONFIRMED]
  )
});

export default dialogs;

export const selectors = {
  selectIsOpenQuizFormDialog: state =>
    fromCreateDialog.selectors.selectIsOpen(state.quizForm),
  selectQuizFormDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(state.quizForm),
  selectIsOpenDeleteQuizConfirmation: state =>
    fromCreateDialog.selectors.selectIsOpen(state.deleteQuizConfirmation),
  selectDeleteQuizConfirmationDialogProps: state =>
    fromCreateDialog.selectors.selectDialogProps(state.deleteQuizConfirmation),
  selectIsOpenRestartQuizConfirmation: state =>
    fromCreateDialog.selectors.selectIsOpen(state.restartQuizConfirmation)
};
