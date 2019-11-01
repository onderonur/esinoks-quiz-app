import React, { useRef } from "react";
import { useField, useFormikContext } from "formik";
import { FormControl, FormLabel, FormHelperText } from "@material-ui/core";
import firebase from "app-firebase";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Froala Editor Plugins
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/css/plugins/draggable.min.css";
import "froala-editor/js/plugins/draggable.min.js";

import FroalaEditor from "react-froala-wysiwyg";

const uploadImage = async file => {
  const storageRef = firebase.storage.ref();
  // TODO: Aynı file name denk gelip varolan bir şeyi ezmemesi için yöntem?
  // quizId ve questionId bazlı tutulabilir image'lar.
  const fileRef = storageRef.child(`question-images/${new Date().getTime()}`);
  const snapshot = await fileRef.put(file);
  const downloadUrl = await snapshot.ref.getDownloadURL();
  return downloadUrl;
};

const BaseRichTextEditor = ({
  // TODO: disabled durumunu ekle editor'e
  disabled,
  label,
  fullWidth,
  required,
  autoFocus,
  ...props
}) => {
  const [field, meta] = useField(props);
  const form = useFormikContext();
  const { name, value } = field;
  const { error } = meta;
  const { setFieldTouched, setFieldValue } = form;

  const editorRef = useRef();

  return (
    <FormControl
      required={required}
      fullWidth={fullWidth}
      error={Boolean(error)}
    >
      <FormLabel>{label}</FormLabel>
      <FroalaEditor
        tag="textarea"
        onManualControllerReady={initControls => {
          initControls.initialize();
          const editor = initControls.getEditor();
          editorRef.current = editor;
        }}
        model={value}
        onModelChange={newModel => {
          setFieldValue(name, newModel);
        }}
        config={{
          // TODO: May implement uploading pasted images later.
          imagePaste: false,
          autofocus: autoFocus,
          // https://wysiwyg-editor.froala.help/hc/en-us/articles/115000413465-Why-aren-t-popups-visible-
          // When the editor is used inside a modal etc, it doesn't show some of the popups like image editing popup.
          // To fix this, we simply set the zIndex to a high value.
          zIndex: 9999,
          imageEditButtons: [
            "imageAlign",
            "imageCaption",
            "imageRemove",
            "imageDisplay"
          ],
          events: {
            focus: () => {
              setFieldTouched(name, true);
            },
            // TODO: Formik için focus ve blur event'lerini koy
            "image.beforeUpload": images => {
              // TODO: Loading indicator konulabilir editor'e
              const file = images[0];
              const editor = editorRef.current;
              editor.edit.off();
              editor.image.showProgressBar();
              uploadImage(file)
                .then(url => {
                  editor.image.insert(url);
                  editor.edit.on();
                })
                .catch(() => {
                  // TODO: Hata mesajı göster
                  editor.edit.on();
                });
              return false;
            }
          }
        }}
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default BaseRichTextEditor;
