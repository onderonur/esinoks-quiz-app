import React, { useState, useEffect, useCallback } from "react";
import {
  ListItem,
  ListItemText,
  SvgIcon,
  ListItemIcon
} from "@material-ui/core";
import BaseList from "components/BaseList";
import firebaseAPI from "firebaseAPI";
import useSelectAuthUser from "hooks/useSelectAuthUser";
import LoadingIndicator from "components/LoadingIndicator";
import APIErrorMessage from "components/APIErrorMessage";
import SOCIAL_PROVIDERS from "constants/socialProviders";
import useNotifier from "hooks/useNotifier";
import useConfirmDialog from "hooks/useConfirmDialog";
import SNACKBAR_VARIANTS from "constants/notificationVariants";

const SIGN_IN_METHODS = Object.values(SOCIAL_PROVIDERS);

// Thanks to: https://www.robinwieruch.de/react-firebase-link-social-logins
const SignInMethods = () => {
  const { isFetching: isFetchingAuthUser, authUser } = useSelectAuthUser();
  const [isFetching, setIsFetching] = useState(!!authUser);
  const [activeMethods, setActiveMethods] = useState([]);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useNotifier();
  const confirm = useConfirmDialog();

  const fetchSignInMethods = useCallback(async () => {
    if (authUser) {
      try {
        setIsFetching(true);
        setError(null);
        const activeMethods = await firebaseAPI.auth.fetchSignInMethodsForEmail(
          authUser.email
        );
        setActiveMethods(activeMethods);
      } catch (error) {
        setError(error);
      } finally {
        setIsFetching(false);
      }
    }
  }, [authUser]);

  useEffect(() => {
    fetchSignInMethods();
  }, [fetchSignInMethods]);

  const showInfoMessage = message =>
    enqueueSnackbar(message, { variant: SNACKBAR_VARIANTS.info });

  const handleLink = async method => {
    try {
      setIsFetching(true);
      const { provider, name } = method;
      await firebaseAPI.auth.currentUser.linkWithPopup(firebaseAPI[provider]);
      await fetchSignInMethods();
      showInfoMessage(`${name} hesabınız profiliniz ile bağlanmıştır.`);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleUnlink = async method => {
    confirm({
      title: "Profil Bağlantısını Kaldır?",
      description: `${method.name} hesabınız ile profiliniz arasında oluşturulan bağlantı kaldırılacaktır.`,
      confirmText: "Kaldır",
      onConfirm: () => handleUnlinkConfirmed(method)
    });
  };

  const handleUnlinkConfirmed = async method => {
    try {
      setIsFetching(true);
      const { id: providerId, name } = method;
      await firebaseAPI.auth.currentUser.unlink(providerId);
      await fetchSignInMethods();
      showInfoMessage(
        `${name} hesabınızın profiliniz ile bağlantısı kaldırılmıştır.`
      );
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <LoadingIndicator loading={isFetchingAuthUser || isFetching}>
      <div>
        <BaseList
          data={SIGN_IN_METHODS}
          renderItem={method => {
            const isActive = activeMethods.includes(method.id);
            const onlyOneLeft = activeMethods.length === 1;

            return (
              <ListItem
                key={method.id}
                dense
                divider
                button
                // If only one sign-in method is left as active,
                // disable all deactivation buttons because there needs to be
                // at least one sign-in method.
                disabled={isActive && onlyOneLeft}
                onClick={() =>
                  isActive ? handleUnlink(method) : handleLink(method)
                }
              >
                <ListItemIcon>
                  <SvgIcon>{method.icon}</SvgIcon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    isActive
                      ? `${method.name} hesabınızın bağlantısını kaldırın.`
                      : `${method.name} hesabınızı profilinize bağlayın.`
                  }
                />
              </ListItem>
            );
          }}
        />
        <APIErrorMessage error={error} />
      </div>
    </LoadingIndicator>
  );
};

export default SignInMethods;
