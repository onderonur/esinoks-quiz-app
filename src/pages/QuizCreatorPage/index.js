import React from "react";
import { Paper, makeStyles, Divider, Typography, Box } from "@material-ui/core";
import QuizForm from "./QuizForm";
import QuestionGridList from "pages/QuizPage/QuestionGridList";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const QuizCreatorPage = () => {
  const classes = useStyles();
  const { quizId } = useParams();
  const isNew = quizId === "new";

  return (
    <Paper className={classes.paper}>
      <QuizForm />
      {/* TODO: Question'ları quizId bazında tut redux'ta
      Burayı copy paste yaptım.
      Quiz'deki listeyle ortak bi şekilde yap bunu. */}
      {!isNew && (
        <>
          <Box marginY={2}>
            <Divider />
          </Box>
          <Typography variant="h5">Sorular</Typography>
          <QuestionGridList />
        </>
      )}
    </Paper>
  );
};

export default QuizCreatorPage;
