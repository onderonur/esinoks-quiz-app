import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Formik, Form } from "formik";
import BaseTextField from "components/BaseTextInput";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { closeQuizFormDialog } from "actions";
import useFirebase from "hooks/useFirebase";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import BaseButton from "components/BaseButton";

const QuizFormDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state =>
    selectors.selectIsOpenQuizFormDialog(state)
  );
  const props = useSelector(state =>
    selectors.selectQuizFormDialogProps(state)
  );
  const firebase = useFirebase();
  const authUser = useSelectAuthUser();
  const [isSubmitting, setIsSubmitting] = useState();

  const { quizId } = props;
  const quiz = useSelector(state =>
    quizId ? selectors.selectOwnQuizById(state, quizId) : null
  );

  const handleSubmit = async values => {
    const { title } = values;
    // TODO: Observable şeklinde yap
    setIsSubmitting(true);
    if (!quizId) {
      await firebase.quizzes().add({
        // TODO: Set authorId automatically, don't pass it as a param
        authorId: authUser.uid,
        title
      });
    } else {
      await firebase.quiz(quizId).set({
        // TODO: Set authorId automatically, don't pass it as a param
        authorId: authUser.uid,
        title
      });
    }

    setIsSubmitting(false);
    handleClose();
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
