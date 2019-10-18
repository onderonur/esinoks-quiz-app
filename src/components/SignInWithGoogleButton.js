import React from "react";
import useFirebase from "hooks/useFirebase";
import { Button } from "@material-ui/core";

// TODO: Icon vb eklenebilir.
const SignInWithGoogleButton = () => {
  const firebase = useFirebase();

  const handleClick = async () => {
    try {
      await firebase.doSignInWithGoogle();
    } catch (error) {
      // TODO: Handle exception
    }
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      Google Hesabı İle Giriş Yap
    </Button>
  );
};

export default SignInWithGoogleButton;
