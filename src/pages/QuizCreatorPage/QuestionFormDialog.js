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
import DeleteIcon from "@material-ui/icons/Delete";
import BaseList from "components/BaseList";
import produce from "immer";
import ChoiceEditor from "./ChoiceEditor";

const MIN_CHOICE_COUNT = 2;
const MAX_CHOICE_COUNT = 6;

// TODO: Girilen choice text'inin boş olmamasını validate et
const validationSchema = Yup.object().shape({
  // TODO: Bu validation'ı firebase tarafında da yap
  text: Yup.string().required("Bu alan zorunludur."),
  choices: Yup.object().test(
    "is-empty",
    `Lütfen en az ${MIN_CHOICE_COUNT}, en çok ${MAX_CHOICE_COUNT} adet seçenek giriniz.`,
    value => {
      const choiceCount = Object.keys(value).length;
      return choiceCount >= MIN_CHOICE_COUNT && choiceCount <= MAX_CHOICE_COUNT;
    }
  )
});

const SELECT_CHOICE_TO_ADD = "SELECT_CHOICE_TO_ADD";
const SELECT_CHOICE_TO_EDIT = "SELECT_CHOICE_TO_EDIT";
const CANCEL = "CANCEL";

const selectChoiceToAdd = choiceId => ({
  type: SELECT_CHOICE_TO_ADD,
  choiceId
});
const selectChoiceToEdit = choiceId => ({
  type: SELECT_CHOICE_TO_EDIT,
  choiceId
});
const cancel = () => ({
  type: CANCEL
});

const initialState = {
  selectedChoiceId: null
};

const choiceEditReducer = (state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SELECT_CHOICE_TO_ADD:
        draft.selectedChoiceId = action.choiceId;
        break;
      case SELECT_CHOICE_TO_EDIT:
        draft.selectedChoiceId = action.choiceId;
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

  const { selectedChoiceId } = choiceEditState;

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
          const choiceCount = choiceIds.length;

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
                        <ChoiceEditor
                          key={choiceId}
                          initialValue={choices[choiceId]}
                          onConfirm={text => {
                            setFieldValue(`choices.${choiceId}`, text);
                            choiceEditDispatch(cancel());
                          }}
                          onCancel={() => choiceEditDispatch(cancel())}
                        />
                      ) : (
                        <ListItem
                          key={choiceId}
                          button
                          divider
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
                  {selectedChoiceId && !choiceIds.includes(selectedChoiceId) ? (
                    <ChoiceEditor
                      onConfirm={text => {
                        const nextChoiceId = `${quizId}_${choiceIds.length +
                          1}`;
                        setFieldValue(`choices.${nextChoiceId}`, text);
                        choiceEditDispatch(cancel());
                      }}
                      onCancel={text => {
                        choiceEditDispatch(cancel());
                      }}
                    />
                  ) : (
                    choiceCount < MAX_CHOICE_COUNT && (
                      <Box>
                        <BaseButton
                          startIcon={<AddIcon />}
                          disabled={isFetching}
                          onClick={() => {
                            const nextChoiceId = `${quizId}_${choiceIds.length +
                              1}`;

                            choiceEditDispatch(selectChoiceToAdd(nextChoiceId));
                          }}
                        >
                          Seçenek Ekle
                        </BaseButton>
                      </Box>
                    )
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
