import React from "react";
import useAuthStateListener from "hooks/useAuthStateListener";
import { Typography, Avatar } from "@material-ui/core";

const UserDisplayName = () => {
  const authUser = useAuthStateListener();

  return authUser ? (
    <>
      <Avatar src={authUser.photoURL} />
      <Typography variant="h4">{authUser.displayName}</Typography>
    </>
  ) : null;
};

export default UserDisplayName;
