import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import BaseButton from "components/BaseButton";
import { Formik, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import * as Yup from "yup";
import {
  closeQuestionFormDialog,
  createQuestion,
  updateQuestion
} from "actions";
import BaseDivider from "components/BaseDivider";
import EditableChoiceList, {
  MIN_CHOICE_COUNT,
  MAX_CHOICE_COUNT
} from "./EditableChoiceList";
import BaseRichTextEditor from "components/BaseRichTextEditor";

const CHOICE_VALIDATION_MESSAGE = `Lütfen en az ${MIN_CHOICE_COUNT}, en çok ${MAX_CHOICE_COUNT} adet seçenek giriniz.`;

// TODO: Girilen choice text'inin boş olmamasını validate et
const validationSchema = Yup.object().shape({
  // TODO: Bu validation'ı firebase tarafında da yap
  body: Yup.string().required("Bu alan zorunludur."),
  choices: Yup.array()
    .min(MIN_CHOICE_COUNT, CHOICE_VALIDATION_MESSAGE)
    .max(MAX_CHOICE_COUNT, CHOICE_VALIDATION_MESSAGE),
  correctAnswer: Yup.number().min(0, "Lütfen doğru cevabı seçiniz.")
});

const QuestionFormDialog = () => {
  const dispatch = useDispatch();
  const { isOpen, quizId, questionId } = useSelector(state =>
    selectors.selectQuestionFormDialogProps(state)
  );

  const isFetching = useSelector(
    state =>
      selectors.selectIsFetchingCreateQuestion(state) ||
      selectors.selectIsFetchingUpdateQuestion(state)
  );

  const isNew = questionId === "new";

  const question = useSelector(state =>
    isNew ? null : selectors.selectQuestionById(state, questionId)
  );

  const initialValues = {
    body: question ? question.body : "",
    choices: question ? question.choices : [],
    correctAnswer: question ? question.correctAnswer : -1
  };

  // TODO: Kapatma tuşu ekle dialog'a

  return (
    <Dialog open={isOpen} fullWidth fullScreen>
      <DialogTitle>Soru</DialogTitle>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={values => {
          const { body, choices, correctAnswer } = values;

          if (isNew) {
            dispatch(createQuestion({ quizId, body, choices, correctAnswer }));
          } else {
            dispatch(
              updateQuestion({
                quizId,
                questionId,
                body,
                choices,
                correctAnswer
              })
            );
          }
        }}
        // TODO: validateOnMount düzelene kadar bu şekilde devam.
        isInitialValid={validationSchema.isValidSync(initialValues)}
      >
        {({ isValid }) => {
          return (
            <Form
              autoComplete="off"
              noValidate={true}
              style={{
                // Dialog'un scroll'unu düzeltmek için
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flex: 1
              }}
            >
              <DialogContent dividers>
                <BaseRichTextEditor
                  name="body"
                  label="Soru"
                  required
                  fullWidth
                  autoFocus
                  disabled={isFetching}
                />

                <BaseDivider />

                <EditableChoiceList name="choices" />
              </DialogContent>
              <DialogActions>
                <BaseButton
                  disabled={isFetching}
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
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default QuestionFormDialog;
