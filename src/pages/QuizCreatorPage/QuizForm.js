import React from "react";
import { Box, Button, makeStyles } from "@material-ui/core";
import BaseTextField from "components/BaseTextField";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { createQuiz, updateQuiz } from "actions";
import BaseButton from "components/BaseButton";
import { useParams, useHistory, Prompt } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BaseForm from "components/BaseForm";

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

  const { isFetching: isCreating } = useSelector(state =>
    selectors.selectAsyncInfoCreateQuiz(state)
  );

  const { isFetching: isUpdating } = useSelector(state =>
    selectors.selectAsyncInfoUpdateQuiz(state)
  );

  const isFetching = isCreating || isUpdating;

  const { quizId } = useParams();
  const isNew = quizId === "new";
  const quiz = useSelector(state =>
    isNew ? null : selectors.selectQuiz(state, quizId)
  );

  const handleSubmit = values => {
    const { title } = values;

    if (isNew) {
      dispatch(createQuiz({ title, history }));
    } else {
      dispatch(updateQuiz(quizId, { title }));
    }
  };

  const initialValues = {
    title: quiz ? quiz.title : ""
  };

  return (
    <BaseForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ dirty, isValid }) => (
        <>
          <Prompt
            when={!isNew && dirty}
            message="Kaydedilmemiş değişiklikleriniz var. Sayfadan çıkmak istediğinize emin misiniz?"
          />
          <BaseTextField
            name="title"
            label="Başlık"
            autoFocus={isNew}
            required
            fullWidth
            inputProps={{
              className: classes.titleTextField
            }}
            // TODO: Create some custom context for the "isSubmitting" flags in form components.
            disabled={isFetching}
          />
          <Box display="flex" justifyContent="flex-end" marginY={1}>
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
              loading={isFetching}
              disabled={!isValid}
            >
              Kaydet
            </BaseButton>
          </Box>
        </>
      )}
    </BaseForm>
  );
};

export default QuizForm;
