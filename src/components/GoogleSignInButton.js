import React from "react";
import useFirebaseAPI from "hooks/useFirebaseAPI";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { ReactComponent as GoogleIcon } from "assets/google-icon.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    cursor: "pointer",
    height: 40,
    borderWidth: 0,
    backgroundColor: "white",
    color: "#737373",
    borderRadius: 5,
    whiteSpace: "nowrap",
    boxShadow: "1px 1px 0px 1px rgba(0, 0, 0, 0.05)",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    padding: 0,

    "&:hover, &:focus": {
      boxShadow: "1px 4px 5px 1px rgba(0, 0, 0, 0.1)"
    },

    "&:active": {
      backgroundColor: "#e5e5e5",
      boxShadow: "none",
      transitionDuration: "10ms"
    }
  },
  icon: {
    display: "inline-block",
    verticalAlign: "middle",
    margin: "8px 0 8px 8px",
    width: 18,
    height: 18,
    boxSizing: "border-box"
  },
  text: {
    display: "inline-block",
    verticalAlign: "middle",
    padding: "0 24px",
    fontSize: "14px",
    fontWeight: "bold"
  }
}));

// Thanks to: https://codepen.io/slukas23/pen/qwMevr
const GoogleSignInButton = () => {
  const classes = useStyles();
  const firebaseAPI = useFirebaseAPI();
  const { isLoggedIn } = useSelectAuthUser();

  const handleClick = async () => {
    try {
      const socialAuthUser = await firebaseAPI.doSignInWithGoogle();
      const { user } = socialAuthUser;
      // Saving user info to application db
      await firebaseAPI.user(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    } catch (error) {
      console.log(error);
      // TODO: Handle exception
    }
  };

  return isLoggedIn === false ? (
    <button className={classes.button} onClick={handleClick}>
      <span className={classes.icon}>
        <GoogleIcon />
      </span>
      <span className={classes.text}>Google ile Giriş Yap</span>
    </button>
  ) : null;
};

export default GoogleSignInButton;
