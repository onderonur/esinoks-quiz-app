import React from "react";
import { Paper, Typography, Box, Divider, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ProfileHeader from "./ProfileHeader";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const ProfilePage = () => {
  const classes = useStyles();

  return (
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
        <Button color="primary" startIcon={<AddIcon />}>
          Yeni Quiz
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfilePage;
