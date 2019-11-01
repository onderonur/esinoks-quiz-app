import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

const BaseTextField = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { error } = meta;

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default BaseTextField;
