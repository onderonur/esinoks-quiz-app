import React from "react";
import { Paper, Typography, Box, Divider, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ProfileHeader from "./ProfileHeader";
import { makeStyles } from "@material-ui/styles";
import QuizFormDialog from "./QuizFormDialog";
import { useDispatch } from "react-redux";
import { openQuizFormDialog } from "actions";
import QuizList from "./QuizList";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Paper className={classes.paper}>
        <Box marginY={2}>
          <ProfileHeader />
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginY={2}
        >
          <Typography variant="h5">Quiz'lerim</Typography>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => dispatch(openQuizFormDialog())}
          >
            Yeni Quiz
          </Button>
        </Box>
        <QuizList />
      </Paper>
      <QuizFormDialog />
    </>
  );
};

export default ProfilePage;
