import React, { useCallback } from "react";
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
import BaseDialogTitle from "components/BaseDialogTitle";
import BaseDialogContent from "components/BaseDialogContent";
import BaseDialog from "components/BaseDialog";
import BaseDialogActions from "components/BaseDialogActions";
import firebaseAPI from "firebaseAPI";
import BaseForm from "components/BaseForm";

const CHOICE_VALIDATION_MESSAGE = `Lütfen en az ${MIN_CHOICE_COUNT}, en çok ${MAX_CHOICE_COUNT} adet seçenek giriniz.`;

const validationSchema = Yup.object().shape({
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

  const isNew = questionId === "new";

  const question = useSelector(state =>
    isNew ? null : selectors.selectQuestion(state, questionId)
  );

  const initialValues = {
    body: question ? question.body : "",
    choices: question ? question.choices : [],
    correctAnswer: question ? question.correctAnswer : -1
  };

  const handleUploadSuccess = useCallback(
    fullpath => {
      firebaseAPI.quizImagePaths(quizId).add({ filepath: fullpath });
    },
    [quizId]
  );

  const handleClose = useCallback(() => {
    dispatch(closeQuestionFormDialog());
  }, [dispatch]);

  const { isFetching } = useSelector(state =>
    isNew
      ? selectors.selectAsyncInfoCreateQuestion(state)
      : selectors.selectAsyncInfoUpdateQuestion(state)
  );

  return (
    <BaseDialog isOpen={isOpen} onClose={handleClose} disableBackdropClick>
      <BaseForm
        autoComplete="off"
        noValidate
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          const { body, choices, correctAnswer } = values;

          if (isNew) {
            dispatch(
              createQuestion(quizId, { body, choices, correctAnswer })
            );
          } else {
            dispatch(
              updateQuestion(quizId, questionId, {
                body,
                choices,
                correctAnswer
              })
            );
          }
        }}
        // TODO: Dialog'un scroll'unu düzeltmek için
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          flex: 1
        }}
      >
        {({ isValid }) => {
          return (
            <>
              <BaseDialogTitle>Soru</BaseDialogTitle>
              <BaseDialogContent>
                <BaseRichTextEditor
                  name="body"
                  label="Soru"
                  required
                  fullWidth
                  autoFocus
                  disabled={isFetching}
                  fileUploadPath={`quiz-images/${quizId}`}
                  onUploadSuccess={handleUploadSuccess}
                />

                <BaseDivider />

                <EditableChoiceList name="choices" />
              </BaseDialogContent>
              <BaseDialogActions
                loading={isFetching}
                confirmText="Kaydet"
                confirmButtonProps={{
                  type: "submit",
                  disabled: !isValid
                }}
              />
            </>
          );
        }}
      </BaseForm>
    </BaseDialog>
  );
};

export default QuestionFormDialog;
