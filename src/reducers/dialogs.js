import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

const initialState = {
  quizForm: {
    isOpen: false,
    props: {
      quizId: ""
    }
  }
};

const dialogs = createReducer(initialState, {
  [actionTypes.OPEN_QUIZ_FORM_DIALOG]: (state, { quizId }) => {
    state.quizForm.isOpen = true;
    state.quizForm.props.quizId = quizId;
  },
  [actionTypes.CLOSE_QUIZ_FORM_DIALOG]: state => {
    state.quizForm = initialState.quizForm;
  }
});

export default dialogs;

export const selectors = {
  selectIsOpenQuizFormDialog: state => state.quizForm.isOpen,
  selectQuizFormDialogProps: state => state.quizForm.props
};
