import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import BaseButton from "components/BaseButton";

const QuestionFormDialog = () => {
  const history = useHistory();
  const { quizId } = useParams();
  const isNew = quizId === "new";

  return (
    <Dialog open fullWidth>
      <DialogTitle>Yeni Soru</DialogTitle>
      <DialogContent dividers>Deneme</DialogContent>
      <DialogActions>
        {/* TODO: goBack'i düzelt */}
        <BaseButton onClick={() => history.goBack()}>İptal</BaseButton>
        <BaseButton color="primary">Kaydet</BaseButton>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionFormDialog;
