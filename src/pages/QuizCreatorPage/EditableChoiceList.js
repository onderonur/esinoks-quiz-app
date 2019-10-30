import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import BaseButton from "components/BaseButton";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import AddIcon from "@material-ui/icons/Add";
import BaseList from "components/BaseList";
import ChoiceEditor from "./ChoiceEditor";
import { connect, getIn } from "formik";
import produce from "immer";
import EditableChoiceListItem from "./EditableChoiceListItem";

export const MIN_CHOICE_COUNT = 2;
export const MAX_CHOICE_COUNT = 6;

const EditableChoiceList = ({ name, formik }) => {
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState();

  const { values, errors, setFieldValue } = formik;
  const error = getIn(errors, name);

  const isFetching = useSelector(
    state =>
      selectors.selectIsFetchingCreateQuestion(state) ||
      selectors.selectIsFetchingUpdateQuestion(state)
  );

  const { choices } = values;
  const choiceCount = choices.length;

  const endEditing = () => setSelectedChoiceIndex(null);

  const setChoice = (choiceIndex, text) => {
    const updatedChoices = produce(choices, draft => {
      draft[choiceIndex] = text;
    });
    setFieldValue("choices", updatedChoices);
    endEditing();
  };

  return (
    <>
      <Typography variant="subtitle1">Seçenekler</Typography>
      <BaseList
        data={choices}
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
      {/* TODO: Bunları form helper text yap */}
      <div>
        {error && (
          <Typography color="textSecondary" variant="caption">
            {error}
          </Typography>
        )}
      </div>
      <div>
        {errors.correctAnswer && (
          <Typography color="textSecondary" variant="caption">
            {errors.correctAnswer}
          </Typography>
        )}
      </div>
    </>
  );
};

export default connect(EditableChoiceList);
