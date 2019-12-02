import React from "react";
import { Paper, makeStyles, Container, Box } from "@material-ui/core";
import BaseTextField from "components/BaseTextField";
import BaseButton from "components/BaseButton";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import BaseDivider from "components/BaseDivider";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import SocialSignInButtonsSection from "components/SocialSignInButtonsSection";
import { ReactComponent as Logo } from "assets/logo.svg";
import AppTitle from "components/AppTitle";
import BaseForm from "components/BaseForm";

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
    alignItems: "center"
  },
  divider: {
    alignSelf: "stretch"
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isSignedIn } = useSelectAuthUser();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <AppTitle variant="h2" color="primary" />
        <Box width="60%" height="auto" clone>
          <Logo />
        </Box>
        <BaseDivider className={classes.divider} />
        <BaseForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            const { quizId } = values;
            history.push(`/quiz/${quizId}`);
          }}
        >
          {({ isValid }) => {
            return (
              <>
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
              </>
            );
          }}
        </BaseForm>
        {!isSignedIn && <SocialSignInButtonsSection />}
      </Paper>
    </Container>
  );
};

export default HomePage;
