import React, { useState } from "react";
import { Typography, FormHelperText } from "@material-ui/core";
import BaseButton from "components/BaseButton";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import AddIcon from "@material-ui/icons/Add";
import BaseList from "components/BaseList";
import ChoiceEditor from "./ChoiceEditor";
import { connect, useField, useFormikContext } from "formik";
import produce from "immer";
import EditableChoiceListItem from "./EditableChoiceListItem";

export const MIN_CHOICE_COUNT = 2;
export const MAX_CHOICE_COUNT = 6;

const EditableChoiceList = props => {
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState();
  const { name } = props;
  const [field, meta] = useField(props);
  const { value } = field;
  const { error } = meta;
  const { setFieldValue, errors } = useFormikContext();

  const { isFetching: isCreating } = useSelector(state =>
    selectors.selectAsyncInfoCreateQuestion(state)
  );

  const { isFetching: isUpdating } = useSelector(state =>
    selectors.selectAsyncInfoUpdateQuestion(state)
  );

  const isFetching = isCreating || isUpdating;

  const choiceCount = value.length;

  const endEditing = () => setSelectedChoiceIndex(null);

  const setChoice = (choiceIndex, text) => {
    const updatedChoices = produce(value, draft => {
      draft[choiceIndex] = text;
    });
    setFieldValue(name, updatedChoices);
    endEditing();
  };

  return (
    <>
      <Typography variant="subtitle1">Seçenekler</Typography>
      <BaseList
        data={value}
        renderItem={(choice, i) => (
          <EditableChoiceListItem
            key={i}
            choiceIndex={i}
            selectedChoiceIndex={selectedChoiceIndex}
            onSelectChoice={setSelectedChoiceIndex}
          />
        )}
        listEmptyMesage="Hiç seçenek bulunamadı."
      />
      {selectedChoiceIndex === "new" ? (
        <ChoiceEditor
          onConfirm={text => setChoice(choiceCount, text)}
          onCancel={endEditing}
        />
      ) : (
        choiceCount < MAX_CHOICE_COUNT && (
          <div>
            <BaseButton
              startIcon={<AddIcon />}
              disabled={isFetching}
              onClick={() => setSelectedChoiceIndex("new")}
            >
              Seçenek Ekle
            </BaseButton>
          </div>
        )
      )}
      <div>{error && <FormHelperText>{error}</FormHelperText>}</div>
      <div>
        {errors.correctAnswer && (
          <FormHelperText>{errors.correctAnswer}</FormHelperText>
        )}
      </div>
    </>
  );
};

export default connect(EditableChoiceList);
