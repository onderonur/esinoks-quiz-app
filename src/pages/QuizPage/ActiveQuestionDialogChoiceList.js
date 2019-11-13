import React from "react";
import { List } from "@material-ui/core";
import ActiveQuestionDialogChoiceListItem from "./ActiveQuestionDialogChoiceListItem";
import { useField, useFormikContext } from "formik";

const ActiveQuestionDialogChoiceList = ({ choices, disabled, ...props }) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  const { name, value } = field;

  return (
    <List>
      {choices.map((choice, i) => (
        <ActiveQuestionDialogChoiceListItem
          key={i}
          choiceIndex={i}
          choice={choice}
          isSelected={value === i}
          onSelected={choiceIndex => setFieldValue(name, choiceIndex)}
          disabled={disabled}
        />
      ))}
    </List>
  );
};

export default ActiveQuestionDialogChoiceList;
