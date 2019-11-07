import React, { useRef, useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl, FormLabel, FormHelperText, Box } from "@material-ui/core";
import firebase from "app-firebase";
import LoadingIndicator from "./LoadingIndicator";
import { fade } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
      <Box position="relative">
        <ReactQuill
          // TODO: Boş string verince ilk value'su "<p><br/><p/>" oluyor ondan validation a takılmıyor.
          // Düzeltilmeli
          value={value}
          onChange={newHtml => setFieldValue(name, newHtml)}
          modules={modulesRef.current}
          formats={formats}
          readOnly={disabled}
        />
        {isUploading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgcolor={fade(grey[400], 0.6)}
          >
            <LoadingIndicator loading={true} />
          </Box>
        )}
      </Box>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default BaseRichTextEditor;
