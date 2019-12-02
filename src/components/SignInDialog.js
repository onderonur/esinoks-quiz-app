import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import BaseDialog from "./BaseDialog";
import BaseDialogContent from "./BaseDialogContent";
import BaseDialogTitle from "./BaseDialogTitle";
import { DialogContentText, Box } from "@material-ui/core";
import SocialSignInButtonsSection from "./SocialSignInButtonsSection";
import { useDispatch } from "react-redux";
import { closeSignInDialog } from "actions";

const SignInDialog = () => {
  const { isOpen } = useSelector(state =>
    selectors.selectSignInDialogProps(state)
  );
  const dispatch = useDispatch();

  return (
    <BaseDialog
      isOpen={isOpen}
      fullWidth={false}
      responsive={false}
      onClose={() => dispatch(closeSignInDialog())}
    >
      <BaseDialogTitle>Giriş Yap</BaseDialogTitle>
      <BaseDialogContent>
        <DialogContentText>
          Sosyal medya hesaplarınızı kullanarak giriş yapabilirsiniz.
        </DialogContentText>
        <Box display="flex" alignItems="center" flexDirection="column">
          <SocialSignInButtonsSection />
        </Box>
      </BaseDialogContent>
    </BaseDialog>
  );
};

export default SignInDialog;
