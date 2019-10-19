import React from "react";
import useAuthStateListener from "hooks/useAuthStateListener";
import { Avatar, Typography, makeStyles, Box } from "@material-ui/core";

const AVATAR_SIZE = 120;

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(3),
    width: AVATAR_SIZE,
    height: AVATAR_SIZE
  }
}));

const ProfileHeader = () => {
  const classes = useStyles();
  const authUser = useAuthStateListener();

  const { displayName, email, photoURL } = authUser || {};

  return (
    <Box display="flex">
      <Avatar className={classes.avatar} src={photoURL} />
      <Box>
        <Typography variant="h5">{displayName}</Typography>
        <Typography variant="subtitle" color="textSecondary">
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
