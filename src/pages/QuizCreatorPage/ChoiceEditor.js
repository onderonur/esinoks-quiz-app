import React, { useState } from "react";
import { TextField, Box, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const ChoiceEditor = ({ initialValue = "", onConfirm, onCancel }) => {
  const [text, setText] = useState(initialValue);

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={text}
        autoFocus
        fullWidth
        multiline
        margin="normal"
        onChange={e => setText(e.target.value)}
      />
      <IconButton size="small" onClick={onCancel}>
        <CloseIcon />
      </IconButton>
      <IconButton size="small" disabled={!text} onClick={() => onConfirm(text)}>
        <CheckIcon />
      </IconButton>
    </Box>
  );
};

export default ChoiceEditor;
