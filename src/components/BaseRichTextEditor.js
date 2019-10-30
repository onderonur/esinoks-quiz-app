import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  makeStyles
} from "@material-ui/core";
import firebase from "app-firebase";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const uploadCallback = async file => {
  const storageRef = firebase.storage.ref();
  // TODO: Aynı file name denk gelip varolan bir şeyi ezmemesi için yöntem?
  // quizId ve questionId bazlı tutulabilir image'lar.
  var fileRef = storageRef.child(`question-images/${new Date().getTime()}`);
  const snapshot = await fileRef.put(file);
  const downloadUrl = await snapshot.ref.getDownloadURL();
  return {
    data: {
      link: downloadUrl
    }
  };
};

const useStyles = makeStyles(theme => ({
  editor: {
    border: "1px solid #f1f1f1",
    padding: theme.spacing(2)
  }
}));

const RichTextEditor = ({
  field, // {name, value, onChange, onBlur}
  form, // {touched, errors, values, setXXXX, handleXXXX, dirty, isValid, submitCount,status, etc.}
  disabled,
  label,
  fullWidth,
  required,
  ...props
}) => {
  const classes = useStyles();
  const { name, value } = field;
  const { touched, errors, setFieldValue } = form;

  const error = errors[name];
  const isTouched = touched[name];

  const hasError = error && isTouched;

  return (
    <FormControl required={required} fullWidth={fullWidth} error={hasError}>
      <FormLabel>{label}</FormLabel>
      <Editor
        {...props}
        {...field}
        placeholder="Buraya yazınız..."
        editorClassName={classes.editor}
        readOnly={disabled}
        editorState={value}
        toolbar={{
          options: ["inline", "list", "image", "history"],
          image: {
            uploadCallback
          }
        }}
        onBlur={() => form.handleBlur(name)}
        onEditorStateChange={newEditorState => {
          setFieldValue(name, newEditorState);
        }}
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

const BaseRichTextEditor = props => {
  return <Field {...props} component={RichTextEditor} />;
};

export default BaseRichTextEditor;
