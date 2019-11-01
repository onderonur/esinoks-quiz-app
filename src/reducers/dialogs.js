import * as actionTypes from "constants/actionTypes";
import { getFetchActionTypes } from "utils";
import createDialog, * as fromCreateDialog from "./higherOrderReducers/createDialog";
import { combineReducers } from "redux";

const { successType: CREATE_QUESTION_SUCCESS } = getFetchActionTypes(
  actionTypes.CREATE_QUESTION
);

const { successType: UPDATE_QUESTION_SUCCESS } = getFetchActionTypes(
  actionTypes.UPDATE_QUESTION
);

const { successType: DELETE_QUIZ_CONFIRMED_SUCCESS } = getFetchActionTypes(
  actionTypes.DELETE_QUIZ_CONFIRMED
);

const { successType: DELETE_QUESTION_CONFIRMED_SUCCESS } = getFetchActionTypes(
  actionTypes.DELETE_QUESTION_CONFIRMED
);

const dialogs = combineReducers({
  questionForm: createDialog(
    [actionTypes.OPEN_QUESTION_FORM_DIALOG],
    [
      actionTypes.CLOSE_QUESTION_FORM_DIALOG,
      CREATE_QUESTION_SUCCESS,
      UPDATE_QUESTION_SUCCESS
    ]
  ),
  deleteQuizConfirmation: createDialog(
    [actionTypes.DELETE_QUIZ],
    [actionTypes.DELETE_QUIZ_CANCELLED, DELETE_QUIZ_CONFIRMED_SUCCESS]
  ),
  deleteQuestionConfirmation: createDialog(
    [actionTypes.DELETE_QUESTION],
    [actionTypes.DELETE_QUESTION_CANCELLED, DELETE_QUESTION_CONFIRMED_SUCCESS]
  ),
  restartQuizConfirmation: createDialog(
    [actionTypes.RESTART_QUIZ],
    [actionTypes.RESTART_QUIZ_CANCELLED, actionTypes.RESTART_QUIZ_CONFIRMED]
  )
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
    fromCreateDialog.selectors.selectDialogProps(state.restartQuizConfirmation)
};
