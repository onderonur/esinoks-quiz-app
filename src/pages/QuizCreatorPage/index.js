import React from "react";
import {
  Paper,
  makeStyles,
  Divider,
  Typography,
  Box,
  Button
} from "@material-ui/core";
import QuizForm from "./QuizForm";
import QuestionGridList from "pages/QuizPage/QuestionGridList";
import { useParams, Route, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import QuestionFormDialog from "./QuestionFormDialog";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const QuizCreatorPage = () => {
  const classes = useStyles();
  const history = useHistory();
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

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Sorular</Typography>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={() =>
                history.push(`/profile/quiz/${quizId}/question/new`)
              }
            >
              Yeni Soru
            </Button>
          </Box>
          <Route path="/profile/quiz/:quizId/question/:questionId">
            <QuestionFormDialog />
          </Route>
          <QuestionGridList />
        </>
      )}
    </Paper>
  );
};

export default QuizCreatorPage;
