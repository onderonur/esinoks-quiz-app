import React, { useReducer } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import BaseButton from "components/BaseButton";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import BaseTextField from "components/BaseTextField";
import * as Yup from "yup";
import {
  closeQuestionFormDialog,
  createQuestion,
  updateQuestion
} from "actions";
import BaseDivider from "components/BaseDivider";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import BaseList from "components/BaseList";
import produce from "immer";

// TODO: Girilen choice text'inin boş olmamasını validate et
const validationSchema = Yup.object().shape({
  // TODO: Bu validation'ı firebase tarafında da yap
  text: Yup.string().required("Bu alan zorunludur."),
  choices: Yup.object().test(
    "is-empty",
    "Lütfen en az 2 adet seçenek giriniz.",
    value => {
      const choiceCount = Object.keys(value).length;
      return choiceCount >= 2;
    }
  )
});

const ADD = "ADD";
const EDIT = "EDIT";

const SELECT_CHOICE_TO_ADD = "SELECT_CHOICE_TO_ADD";
const SELECT_CHOICE_TO_EDIT = "SELECT_CHOICE_TO_EDIT";
const CANCEL = "CANCEL";

const selectChoiceToAdd = choiceId => ({
  type: SELECT_CHOICE_TO_ADD,
  choiceId
});
const selectChoiceToEdit = (choiceId, choiceTextBeforeEdit) => ({
  type: SELECT_CHOICE_TO_EDIT,
  choiceId,
  choiceTextBeforeEdit
});
const cancel = () => ({
  type: CANCEL
});

const initialState = {
  selectedChoiceId: null,
  mode: null,
  choiceTextBeforeEdit: ""
};

const choiceEditReducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SELECT_CHOICE_TO_ADD:
        draft.selectedChoiceId = action.choiceId;
        draft.mode = ADD;
        draft.choiceTextBeforeEdit = "";
        break;
      case SELECT_CHOICE_TO_EDIT:
        draft.selectedChoiceId = action.choiceId;
        draft.mode = EDIT;
        draft.choiceTextBeforeEdit = action.choiceTextBeforeEdit;
        break;
      case CANCEL:
        return initialState;
      default:
        throw new Error();
    }
  });
};

const QuestionFormDialog = () => {
  const [choiceEditState, choiceEditDispatch] = useReducer(
    choiceEditReducer,
    initialState
  );
  const dispatch = useDispatch();
  const isOpen = useSelector(state =>
    selectors.selectIsOpenQuestionFormDialog(state)
  );
  const dialogProps = useSelector(state =>
    selectors.selectQuestionFormDialogProps(state)
  );

  const isFetching = useSelector(
    state =>
      selectors.selectIsFetchingCreateQuestion(state) ||
      selectors.selectIsFetchingUpdateQuestion(state)
  );

  const { quizId, questionId } = dialogProps;
  const isNew = questionId === "new";

  const question = useSelector(state =>
    isNew ? null : selectors.selectQuestionById(state, questionId)
  );

  const initialValues = {
    text: question ? question.text : "",
    choices: question ? question.choices : {}
  };

  const { selectedChoiceId, choiceTextBeforeEdit, mode } = choiceEditState;

  // TODO: Kapatma tuşu ekle dialog'a

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onExited={() => choiceEditDispatch(cancel())}
    >
      <DialogTitle>Soru</DialogTitle>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={values => {
          choiceEditDispatch(cancel());

          const { text, choices } = values;

          if (isNew) {
            dispatch(createQuestion({ quizId, text, choices }));
          } else {
            dispatch(updateQuestion({ quizId, questionId, text, choices }));
          }
        }}
        isInitialValid={validationSchema.isValidSync(initialValues)}
      >
        {({ isValid, setFieldValue, values }) => {
          const { choices } = values;
          const choiceIds = Object.keys(choices);
          return (
            <>
              <Form autoComplete="off" noValidate={true}>
                <DialogContent dividers>
                  <BaseTextField
                    name="text"
                    label="Soru"
                    autoFocus
                    required
                    fullWidth
                    multiline
                    rows={3}
                    rowsMax={6}
                    variant="outlined"
                    // TODO: Bu isSubmitting'leri daha reusable bi şekilde yap
                    disabled={isFetching}
                  />

                  <BaseDivider />

                  <Typography variant="subtitle1">Seçenekler</Typography>
                  <BaseList
                    data={choiceIds}
                    renderItem={choiceId =>
                      selectedChoiceId === choiceId ? (
                        <Box key={choiceId} display="flex">
                          <BaseTextField
                            name={`choices.${selectedChoiceId}`}
                            fullWidth
                            required
                            autoFocus
                            multiline
                            rowsMax={3}
                          />
                          <IconButton
                            size="small"
                            onClick={() => {
                              if (mode === EDIT) {
                                const newChoices = produce(choices, draft => {
                                  draft[choiceId] = choiceTextBeforeEdit;
                                });
                                setFieldValue("choices", newChoices);
                              } else {
                                const newChoices = produce(choices, draft => {
                                  delete draft[choiceId];
                                });
                                setFieldValue("choices", newChoices);
                              }

                              choiceEditDispatch(cancel());
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            disabled={!choices[choiceId]}
                            onClick={() => choiceEditDispatch(cancel())}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <ListItem
                          key={choiceId}
                          dense
                          button
                          disabled={isFetching}
                          onClick={() =>
                            choiceEditDispatch(
                              selectChoiceToEdit(choiceId, choices[choiceId])
                            )
                          }
                        >
                          <ListItemText primary={choices[choiceId]} />
                          <ListItemSecondaryAction>
                            <IconButton
                              color="secondary"
                              size="small"
                              disabled={isFetching}
                              onClick={() => {
                                const newChoices = produce(choices, draft => {
                                  delete draft[choiceId];
                                });

                                setFieldValue("choices", newChoices);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    }
                    listEmptyMesage="Hiç seçenek bulunamadı."
                  />
                  {!selectedChoiceId && (
                    <Box>
                      <BaseButton
                        startIcon={<AddIcon />}
                        disabled={isFetching}
                        onClick={() => {
                          const nextChoiceId = `${quizId}_${choiceIds.length +
                            1}`;

                          // Setting the initial value of the new choice text field.
                          // Otherwise, because of the new choice has no initial value,
                          // the text field component switches between uncontrolled to controlled component.
                          setFieldValue(`choices.${nextChoiceId}`, "");
                          choiceEditDispatch(selectChoiceToAdd(nextChoiceId));
                        }}
                      >
                        Seçenek Ekle
                      </BaseButton>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions>
                  <BaseButton
                    // TODO: Cancel'a basınca dialog'u kapatsın. OnExited'da ise bu dispatch'i ve choiceEditor'u cancel'lamayı yapsın
                    onClick={() => dispatch(closeQuestionFormDialog())}
                  >
                    İptal
                  </BaseButton>
                  <BaseButton
                    type="submit"
                    color="primary"
                    loading={isFetching}
                    disabled={!isValid}
                  >
                    Kaydet
                  </BaseButton>
                </DialogActions>
              </Form>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default QuestionFormDialog;
