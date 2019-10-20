import React from "react";
import useFirebase from "hooks/useFirebase";
import { Button } from "@material-ui/core";
import useSelectAuthUser from "hooks/useSelectAuthUser";

// TODO: Icon vb eklenebilir.
const SignInWithGoogleButton = () => {
  const firebase = useFirebase();
  const authUser = useSelectAuthUser();

  const handleClick = async () => {
    try {
      const socialAuthUser = await firebase.doSignInWithGoogle();
      const { user } = socialAuthUser;
      // Saving user info to application db
      await firebase.user(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    } catch (error) {
      console.log(error);
      // TODO: Handle exception
    }
  };

  return authUser ? null : (
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
