import React from "react";
import useFirebase from "hooks/useFirebase";
import { Button } from "@material-ui/core";

const SignOutButton = () => {
  const firebase = useFirebase();

  const handleClick = async () => {
    firebase.doSignOut();
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      Çıkış
    </Button>
  );
};

export default SignOutButton;
