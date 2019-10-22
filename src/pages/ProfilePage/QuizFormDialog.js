import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Formik, Form } from "formik";
import BaseTextField from "components/BaseTextField";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { closeQuizFormDialog, createQuiz } from "actions";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import BaseButton from "components/BaseButton";

const QuizFormDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state =>
    selectors.selectIsOpenQuizFormDialog(state)
  );

  const authUser = useSelectAuthUser();
  const isSubmitting = useSelector(state =>
    selectors.selectIsFetchingCreateQuiz(state)
  );

  const dialogProps = useSelector(state =>
    selectors.selectQuizFormDialogProps(state)
  );
  const { quizId } = dialogProps;
  const quiz = useSelector(state =>
    quizId ? selectors.selectOwnQuizById(state, quizId) : null
  );

  const handleSubmit = values => {
    const { title } = values;
    dispatch(createQuiz({ id: quizId, title, authorId: authUser.uid }));
  };

  const handleClose = () => {
    dispatch(closeQuizFormDialog());
  };

  return (
    <Dialog open={isOpen} fullWidth onClose={handleClose}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: quiz ? quiz.title : ""
        }}
        validationSchema={Yup.object().shape({
          // TODO: Bu validation'ı firebase tarafında da yap
          title: Yup.string().required("Bu alan zorunludur.")
        })}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off" noValidate={true}>
          <DialogTitle>Quiz</DialogTitle>
          <DialogContent dividers>
            <BaseTextField
              name="title"
              label="Başlık"
              autoFocus
              required
              fullWidth
              // TODO: Bu isSubmitting'leri daha reusable bi şekilde yap
              disabled={isSubmitting}
            />
          </DialogContent>
          <DialogActions>
            <BaseButton onClick={handleClose} disabled={isSubmitting}>
              İptal
            </BaseButton>
            <BaseButton type="submit" color="primary" loading={isSubmitting}>
              Kaydet
            </BaseButton>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default QuizFormDialog;
