import React, { useRef, useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl, FormLabel, FormHelperText } from "@material-ui/core";
import firebase from "app-firebase";
import { makeStyles } from "@material-ui/core/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingOverlay from "./LoadingOverlay";

const uploadFile = async (file, path) => {
  const storageRef = firebase.storage.ref();
  // TODO: Aynı file name denk gelip varolan bir şeyi ezmemesi için yöntem?
  // quizId ve questionId bazlı tutulabilir image'lar.
  const fileRef = storageRef.child(`${path}/${new Date().getTime()}`);
  const snapshot = await fileRef.put(file);
  const downloadUrl = await snapshot.ref.getDownloadURL();
  return downloadUrl;
};

const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "ordered",
  "bullet",
  "indent",
  "image",
  "color"
];

const useStyles = makeStyles(theme => ({
  editor: {
    "& .ql-container": {
      minHeight: 120,
      maxHeight: 600,
      overflow: "auto"
    }
  }
}));

const BaseRichTextEditor = ({
  // TODO: disabled durumunu ekle editor'e
  disabled,
  label,
  fullWidth,
  required,
  autoFocus,
  fileUploadPath,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const form = useFormikContext();
  const { name, value } = field;
  const { error } = meta;
  const { setFieldValue } = form;

  const [isUploading, setIsUploading] = useState(false);
  const modulesRef = useRef();

  useEffect(() => {
    modulesRef.current = {
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
          // TODO: undo-redo tuşlarını ekle
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

              // Move cursor to right side of image (easier to continue typing)
              this.quill.setSelection(range.index + 1);

              setIsUploading(true);
              const downloadUrl = await uploadFile(file, fileUploadPath);
              setIsUploading(false);

              // Remove placeholder image
              this.quill.deleteText(range.index, 1);

              // Insert uploaded image
              this.quill.insertEmbed(range.index, "image", downloadUrl);
            };
          }
        }
      }
    };
  }, [fileUploadPath]);

  return (
    <FormControl
      required={required}
      fullWidth={fullWidth}
      error={Boolean(error)}
    >
      <FormLabel>{label}</FormLabel>
      <LoadingOverlay loading={isUploading}>
        <ReactQuill
          // TODO: Boş string verince ilk value'su "<p><br/><p/>" oluyor ondan validation a takılmıyor.
          // Düzeltilmeli
          className={classes.editor}
          value={value}
          onChange={newHtml => setFieldValue(name, newHtml)}
          modules={modulesRef.current}
          formats={formats}
          readOnly={disabled || isUploading}
        />
      </LoadingOverlay>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default BaseRichTextEditor;
