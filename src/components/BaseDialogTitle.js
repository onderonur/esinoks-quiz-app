import React from "react";
import { DialogTitle, Typography, IconButton, Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import useBaseDialogContext from "hooks/useBaseDialogContext";

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(1, 2)
  },
  closeButton: {
    color: theme.palette.grey[500]
  }
}));

const BaseDialogTitle = ({ title, hideCloseButton }) => {
  const classes = useStyles();
  const close = useBaseDialogContext();

  return (
    <DialogTitle disableTypography className={classes.title}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        {!hideCloseButton && (
          <IconButton className={classes.closeButton} onClick={close}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
    </DialogTitle>
  );
};

export default BaseDialogTitle;
