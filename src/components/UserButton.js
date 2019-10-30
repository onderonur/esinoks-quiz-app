import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import UserMenu from "./UserMenu";

const useStyles = makeStyles(theme => ({
  avatar: {
    cursor: "pointer"
  }
}));

const UserButton = () => {
  const classes = useStyles();
  const authUser = useSelectAuthUser();

  return authUser ? (
    <UserMenu
      renderTrigger={({ onClick }) => (
        // TODO: Bu avatar button'un style'ını vs düzelt
        <Avatar
          className={classes.avatar}
          src={authUser.photoURL}
          onClick={onClick}
        />
      )}
    />
  ) : null;
};

export default UserButton;
