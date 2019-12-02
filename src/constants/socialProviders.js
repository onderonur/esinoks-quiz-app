import React from "react";
import firebaseAPI from "firebaseAPI";
import { ReactComponent as GoogleIcon } from "assets/google-icon.svg";
import { ReactComponent as FacebookIcon } from "assets/facebook-icon.svg";

const SOCIAL_PROVIDERS = {
  Google: {
    id: "google.com",
    name: "Google",
    provider: "googleProvider",
    handler: firebaseAPI.signInWithGoogle,
    icon: <GoogleIcon />,
    backgroundColor: "white",
    color: "#737373",
    activeBackgroundColor: "#e5e5e5"
  },
  Facebook: {
    id: "facebook.com",
    name: "Facebook",
    provider: "facebookProvider",
    handler: firebaseAPI.signInWithFacebook,
    icon: <FacebookIcon />,
    backgroundColor: "#4267b2",
    color: "white",
    activeBackgroundColor: "#3b5998"
  }
};

export default SOCIAL_PROVIDERS;
