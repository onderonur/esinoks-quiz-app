import React, { useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import BaseTextField from "components/BaseTextInput";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import {
  closeQuizFormDialog,
  createQuiz,
  updateQuiz,
  openQuizFormDialog,
  receiveQuiz
} from "actions";
import BaseButton from "components/BaseButton";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { useParams, useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useFirebase from "hooks/useFirebase";

const QuizCreator = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const firebase = useFirebase();

  const isSubmitting = useSelector(
    state =>
      selectors.selectIsFetchingCreateQuiz(state) ||
      selectors.selectIsFetchingUpdateQuiz(state)
  );

  const { quizId } = useParams();
  const isNew = quizId === "new";
  const quiz = useSelector(state =>
    isNew ? null : selectors.selectOwnQuizById(state, quizId)
  );

  useEffect(() => {
    const listener = firebase.quiz(quizId).onSnapshot(quizDoc => {
      dispatch(receiveQuiz(quizDoc));
    });

    return () => listener();
  }, [firebase, dispatch, quizId]);

  const authUser = useSelectAuthUser();

  const handleSubmit = values => {
    const { title } = values;

    if (quizId) {
      dispatch(updateQuiz({ quizId, title }));
    } else {
      dispatch(createQuiz({ title, authorId: authUser.uid }));
    }
  };

  const handleClose = () => {
    dispatch(closeQuizFormDialog());
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginY={2}
      >
        <Typography variant="h5" noWrap>
          {quiz ? quiz.title : "Yeni Quiz"}
        </Typography>
        <Box flexShrink={0}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => history.push("/profile")}
          >
            Geri
          </Button>
          <Button
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => dispatch(openQuizFormDialog())}
          >
            Kaydet
          </Button>
        </Box>
      </Box>
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
          <BaseTextField
            name="title"
            label="Başlık"
            autoFocus
            required
            fullWidth
            // TODO: Bu isSubmitting'leri daha reusable bi şekilde yap
            disabled={isSubmitting}
          />
          <BaseButton onClick={handleClose} disabled={isSubmitting}>
            İptal
          </BaseButton>
          <BaseButton type="submit" color="primary" loading={isSubmitting}>
            Kaydet
          </BaseButton>
        </Form>
      </Formik>
    </>
  );
};

export default QuizCreator;
