import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import { Formik, Form } from "formik";
import BaseTextField from "components/BaseTextField";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { createQuiz, updateQuiz } from "actions";
import BaseButton from "components/BaseButton";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { useParams, useHistory, Prompt } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Lütfen bir başlık giriniz.")
    .max(60, ({ max }) => `Başlık uzunluğu en fazla ${max} karakter olabilir.`)
});

const useStyles = makeStyles(theme => ({
  titleTextField: theme.typography.h6
}));

const QuizForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const isSubmitting = useSelector(
    state =>
      selectors.selectIsFetchingCreateQuiz(state) ||
      selectors.selectIsFetchingUpdateQuiz(state)
  );

  const { quizId } = useParams();
  const isNew = quizId === "new";
  const quiz = useSelector(state =>
    isNew ? null : selectors.selectQuizById(state, quizId)
  );

  const { authUser } = useSelectAuthUser();

  const handleSubmit = values => {
    const { title } = values;

    if (isNew) {
      dispatch(createQuiz({ title, authorId: authUser.uid, history }));
    } else {
      dispatch(updateQuiz({ quizId, title }));
    }
  };

  const initialValues = {
    title: quiz ? quiz.title : ""
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      isInitialValid={validationSchema.isValidSync(initialValues)}
    >
      {({ dirty, isValid }) => (
        <>
          <Prompt
            when={!isNew && dirty}
            message="Kaydedilmemiş değişiklikleriniz var. Sayfadan çıkmak istediğinize emin misiniz?"
          />
          <Form autoComplete="off" noValidate>
            <BaseTextField
              name="title"
              label="Başlık"
              autoFocus={isNew}
              required
              fullWidth
              inputProps={{
                className: classes.titleTextField
              }}
              // TODO: Bu isSubmitting'leri daha reusable bi şekilde yap
              disabled={isSubmitting}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => history.push("/profile")}
              >
                Geri
              </Button>
              <BaseButton
                type="submit"
                startIcon={<SaveIcon />}
                color="primary"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Kaydet
              </BaseButton>
            </Box>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default QuizForm;
