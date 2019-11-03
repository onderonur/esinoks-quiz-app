import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { selectQuestion, answerQuestion } from "actions";
import QuestionDialogChoiceList from "./QuestionDialogChoiceList";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import BaseDialogTitle from "components/BaseDialogTitle";
import BaseDialog from "components/BaseDialog";
import BaseDialogActions from "components/BaseDialogActions";
import BaseDialogContent from "components/BaseDialogContent";

const validationSchema = Yup.object().shape({
  givenAnswer: Yup.number().required()
});

const QuestionDialog = () => {
  const dispatch = useDispatch();

  const question = useSelector(state => selectors.selectActiveQuestion(state));

  const questionIndex = useSelector(state =>
    question ? selectors.selectQuestionIndexById(state, question.id) : null
  );

  const givenAnswer = useSelector(state =>
    question
      ? selectors.selectGivenAnswerByQuestionId(state, question.id)
      : undefined
  );

  const choices = question ? question.choices : [];

  const isQuestionSelected = !!question;

  const initialValues = {
    givenAnswer
  };

  const didAnswered = givenAnswer !== undefined;

  const handleExited = useCallback(() => {
    dispatch(selectQuestion(null));
  }, [dispatch]);

  return question ? (
    <BaseDialog
      isOpen={isQuestionSelected}
      // Disabled the portal to show modal when the "fullscreen" mode for the application is activated.
      disablePortal
      onExited={handleExited}
    >
      <BaseDialogTitle title={`Soru ${questionIndex + 1}`} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid={validationSchema.isValidSync(initialValues)}
        onSubmit={values => {
          const { givenAnswer } = values;
          dispatch(answerQuestion(question.id, givenAnswer));
        }}
      >
        {({ isValid }) => {
          return (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                flex: 1
              }}
            >
              <BaseDialogContent>
                <FroalaEditorView model={question.body} />
                <QuestionDialogChoiceList
                  name="givenAnswer"
                  choices={choices}
                  disabled={didAnswered}
                />
              </BaseDialogContent>
              <BaseDialogActions
                confirmText="Cevapla"
                confirmButtonProps={{
                  type: "submit",
                  disabled: !isValid || didAnswered
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </BaseDialog>
  ) : null;
};

export default QuestionDialog;
