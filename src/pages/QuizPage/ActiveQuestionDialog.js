import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { answerQuestion, unselectQuestion } from "actions";
import ActiveQuestionDialogChoiceList from "./ActiveQuestionDialogChoiceList";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BaseDialogTitle from "components/BaseDialogTitle";
import BaseDialog from "components/BaseDialog";
import BaseDialogActions from "components/BaseDialogActions";
import BaseDialogContent from "components/BaseDialogContent";
import { useParams } from "react-router-dom";
import SanitizedHtml from "components/SanitizedHtml";

const validationSchema = Yup.object().shape({
  givenAnswer: Yup.number().required()
});

const ActiveQuestionDialog = () => {
  const dispatch = useDispatch();
  const { quizId } = useParams();

  const activeQuestion = useSelector(state =>
    selectors.selectActiveQuestion(state)
  );

  const questionIndex = useSelector(state =>
    activeQuestion
      ? selectors.selectQuestionIndex(state, quizId, activeQuestion.id)
      : null
  );

  const givenAnswer = useSelector(state =>
    activeQuestion
      ? selectors.selectGivenAnswerByQuestionId(state, activeQuestion.id)
      : null
  );

  const choices = activeQuestion ? activeQuestion.choices : [];

  const initialValues = {
    givenAnswer
  };

  const didAnswered = givenAnswer !== undefined;

  const handleExited = useCallback(() => {
    dispatch(unselectQuestion());
  }, [dispatch]);

  return (
    <BaseDialog isOpen={!!activeQuestion} onExited={handleExited}>
      <BaseDialogTitle title={`Soru ${questionIndex + 1}`} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid={validationSchema.isValidSync(initialValues)}
        onSubmit={values => {
          const { givenAnswer } = values;
          dispatch(answerQuestion(activeQuestion.id, givenAnswer));
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
                <SanitizedHtml html={activeQuestion.body} />
                <ActiveQuestionDialogChoiceList
                  name="givenAnswer"
                  choices={choices}
                  disabled={didAnswered}
                />
              </BaseDialogContent>
              <BaseDialogActions
                disabled={didAnswered}
                confirmText="Cevapla"
                confirmButtonProps={{
                  type: "submit",
                  disabled: !isValid
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </BaseDialog>
  );
};

export default ActiveQuestionDialog;
