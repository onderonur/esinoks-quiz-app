import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import LoadingIndicator from "./LoadingIndicator";
import APIErrorMessage from "./APIErrorMessage";
import SOCIAL_PROVIDERS from "constants/socialProviders";
import SocialSignInButton from "./SocialSignInButton";

// TODO: May add Turkish error message for this case
// const { code, message, email } = error;
// const EXISTING_CREDENTIALS_ERROR_CODE =
//   "auth/account-exists-with-different-credential";

const useStyles = makeStyles(theme => ({
  socialButtons: {
    "& > *:not(:first-child)": {
      marginTop: theme.spacing(1)
    }
  }
}));

const SocialSignInButtonsSection = () => {
  const classes = useStyles();
  const { isSignedIn, isFetching: isFetchingAuthUser } = useSelectAuthUser();
  const { isFetching, error } = useSelector(state =>
    selectors.selectAsyncInfoSocialSignIn(state)
  );

  return (
    <LoadingIndicator loading={isFetchingAuthUser || isFetching}>
      {!isSignedIn && (
        <>
          <Box
            marginY={1}
            display="flex"
            flexDirection="column"
            className={classes.socialButtons}
          >
            {Object.values(SOCIAL_PROVIDERS).map(provider => {
              return (
                <SocialSignInButton
                  key={provider.id}
                  providerName={provider.name}
                  icon={provider.icon}
                  backgroundColor={provider.backgroundColor}
                  color={provider.color}
                  activeBackgroundColor={provider.activeBackgroundColor}
                />
              );
            })}
          </Box>
          <APIErrorMessage error={error} />
        </>
      )}
    </LoadingIndicator>
  );
};

export default SocialSignInButtonsSection;
