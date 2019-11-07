import React, { useCallback } from "react";
import BaseDialog from "components/BaseDialog";
import BaseDialogContent from "components/BaseDialogContent";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import {
  IconButton,
  Box,
  Typography,
  makeStyles,
  DialogContentText
} from "@material-ui/core";
import BaseDialogTitle from "components/BaseDialogTitle";
import { shareQuizCodeCompleted } from "actions";
import CopyToClipboard from "components/CopyToClipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import BaseDialogActions from "components/BaseDialogActions";
import BaseButton from "components/BaseButton";

const useStyles = makeStyles(theme => ({
  copyToClipboardButton: {
    marginLeft: theme.spacing(1)
  }
}));

const ShareQuizCodeDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen, quizId } = useSelector(state =>
    selectors.selectShareQuizCodeDialogProps(state)
  );

  const handleExited = useCallback(() => {
    dispatch(shareQuizCodeCompleted());
  }, [dispatch]);

  return (
    <BaseDialog isOpen={isOpen} onExited={handleExited} responsive={false}>
      <BaseDialogTitle title="Quiz Paylaşım Kodu" />
      <BaseDialogContent dividers={false}>
        <DialogContentText>
          Aşağıdaki kodu kopyalayıp paylaşarak istediğiniz kişilerin kolayca bu
          quiz'e ulaşmasını sağlayabilirsiniz.
        </DialogContentText>
        <Box display="flex" alignItems="center">
          <Typography>{quizId}</Typography>
          <CopyToClipboard>
            {({ copy }) => (
              <IconButton
                className={classes.copyToClipboardButton}
                onClick={() => copy(quizId)}
              >
                <FileCopyIcon />
              </IconButton>
            )}
          </CopyToClipboard>
        </Box>
        <BaseDialogActions>
          {({ close }) => (
            <BaseButton color="primary" onClick={close}>
              Tamam
            </BaseButton>
          )}
        </BaseDialogActions>
      </BaseDialogContent>
    </BaseDialog>
  );
};

export default ShareQuizCodeDialog;
