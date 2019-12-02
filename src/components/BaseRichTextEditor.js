import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl, FormLabel, FormHelperText } from "@material-ui/core";
import firebaseAPI from "firebaseAPI";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import spinnerGif from "assets/spinner.gif";
import LoadingIndicator from "./LoadingIndicator";

const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "ordered",
  "bullet",
  "indent",
  "image",
  "color",
  "history"
];

const useStyles = makeStyles(theme => ({
  editor: {
    "& .ql-container": {
      maxHeight: 300,
      overflow: "auto"
    }
  }
}));

const BaseRichTextEditor = ({
  disabled,
  label,
  fullWidth,
  required,
  autoFocus,
  fileUploadPath,
  onUploadSuccess,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const form = useFormikContext();
  const { name, value } = field;
  const { error } = meta;
  const { setFieldValue } = form;

  const [modules, setModules] = useState();

  useEffect(() => {
    setModules({
      toolbar: {
        container: [
          ["bold", "italic", "underline"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          [{ color: [] }],
          ["image"],
          ["clean"]
        ],
        handlers: {
          image: function() {
            const input = document.createElement("input");

            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files[0];
              const formData = new FormData();

              formData.append("image", file);

              // Save current cursor state
              const range = this.quill.getSelection(true);

              // Insert temporary loading placeholder image
              this.quill.insertEmbed(range.index, "image", spinnerGif);

              // Move cursor to right side of image (easier to continue typing)
              this.quill.setSelection(range.index + 1);

              const { downloadURL, fullPath } = await firebaseAPI.upload(
                file,
                fileUploadPath
              );

              onUploadSuccess(fullPath);

              // Remove placeholder image
              this.quill.deleteText(range.index, 1);

              // Insert uploaded image
              this.quill.insertEmbed(range.index, "image", downloadURL);

              this.quill.setSelection(range.index + 1);
            };
          }
        }
      }
    });
  }, [fileUploadPath, onUploadSuccess]);

  return (
    <FormControl
      required={required}
      fullWidth={fullWidth}
      error={Boolean(error)}
    >
      <FormLabel>{label}</FormLabel>
      <LoadingIndicator loading={!modules}>
        <ReactQuill
          // TODO: When user types something and deletes it, the value remains as "<p><br/><p/>".
          // Thus, it is not triggering the "isRequired" validation.
          // Needs some fix.
          className={classes.editor}
          value={value}
          onChange={newHtml => setFieldValue(name, newHtml)}
          modules={modules}
          formats={formats}
          readOnly={disabled}
        />
      </LoadingIndicator>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default BaseRichTextEditor;
