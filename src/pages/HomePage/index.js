import React from "react";
import { Paper, Box, makeStyles, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import BaseTextField from "components/BaseTextField";
import BaseButton from "components/BaseButton";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const initialValues = {
  quizId: ""
};

const validationSchema = Yup.object().shape({
  quizId: Yup.string().required("Lütfen bir quiz kodu giriniz.")
});

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 600
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box display="flex" justifyContent="center">
      <Paper className={classes.paper}>
        <Typography variant="h5">Esinoks</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          isInitialValid={validationSchema.isValidSync(initialValues)}
          onSubmit={values => {
            const { quizId } = values;
            history.push(`/quiz/${quizId}`);
          }}
        >
          {({ isValid }) => {
            return (
              <Form>
                <BaseTextField
                  name="quizId"
                  label="Quiz Kodu"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <BaseButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!isValid}
                >
                  Başla
                </BaseButton>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
};

export default HomePage;
