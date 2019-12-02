import React from "react";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { socialSignIn } from "actions";

const useStyles = makeStyles(theme => ({
  button: {
    cursor: "pointer",
    height: 40,
    borderWidth: 0,
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    color: ({ color }) => color,
    borderRadius: 5,
    whiteSpace: "nowrap",
    boxShadow: "1px 1px 0px 1px rgba(0, 0, 0, 0.05)",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    padding: 0,
    textAlign: "left",
    "&:hover, &:focus": {
      boxShadow: "1px 4px 5px 1px rgba(0, 0, 0, 0.1)"
    },

    "&:active": {
      backgroundColor: ({ activeBackgroundColor }) => activeBackgroundColor,
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
const SocialSignInButton = ({
  icon,
  backgroundColor,
  color,
  activeBackgroundColor,
  providerName
}) => {
  const classes = useStyles({ backgroundColor, color, activeBackgroundColor });
  const dispatch = useDispatch();
  const { isSignedIn } = useSelectAuthUser();

  const handleClick = async () => {
    dispatch(socialSignIn(providerName));
  };

  return isSignedIn === false ? (
    <button className={classes.button} onClick={handleClick}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.text}>{providerName} ile Giriş Yap</span>
    </button>
  ) : null;
};

export default SocialSignInButton;
