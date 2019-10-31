import React from "react";
import { List } from "@material-ui/core";
import QuestionDialogChoiceListItem from "./QuestionDialogChoiceListItem";
import { useField, useFormikContext } from "formik";

const QuestionDialogChoiceList = ({ choices, disabled, ...props }) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext();

  const { name, value } = field;

  return (
    <List>
      {choices.map((choice, i) => (
        <QuestionDialogChoiceListItem
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

export default QuestionDialogChoiceList;
