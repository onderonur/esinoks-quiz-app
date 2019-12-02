import React from "react";
import { Avatar, Typography, makeStyles, Box } from "@material-ui/core";
import useSelectAuthUser from "hooks/useSelectAuthUser";

const AVATAR_SIZE = 80;

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(3),
    width: AVATAR_SIZE,
    height: AVATAR_SIZE
  },
  overflowEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));

const ProfileHeader = () => {
  const classes = useStyles();
  const { authUser } = useSelectAuthUser();

  const { displayName, email, photoURL } = authUser;

  return (
    <Box display="flex">
      <Avatar className={classes.avatar} src={photoURL} />
      <Box overflow="hidden">
        <Typography className={classes.overflowEllipsis} variant="h5">
          {displayName}
        </Typography>
        <Typography
          className={classes.overflowEllipsis}
          variant="subtitle1"
          color="textSecondary"
        >
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
