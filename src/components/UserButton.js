import React from "react";
import { Avatar, makeStyles, Button } from "@material-ui/core";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import UserMenu from "./UserMenu";
import SignInDialog from "./SignInDialog";
import { useDispatch } from "react-redux";
import { openSignInDialog } from "actions";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  avatar: {
    cursor: "pointer"
  }
}));

const UserButton = () => {
  const classes = useStyles();
  const { isFetching, authUser } = useSelectAuthUser();
  const dispatch = useDispatch();
  const match = useRouteMatch({
    exact: true,
    path: "/"
  });

  return isFetching ? null : authUser ? (
    <UserMenu
      renderTrigger={({ onClick }) => (
        <Avatar
          className={classes.avatar}
          src={authUser.photoURL}
          onClick={onClick}
        />
      )}
    />
  ) : match ? null : (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => dispatch(openSignInDialog())}
      >
        Giriş Yap
      </Button>
      <SignInDialog />
    </>
  );
};

export default UserButton;
