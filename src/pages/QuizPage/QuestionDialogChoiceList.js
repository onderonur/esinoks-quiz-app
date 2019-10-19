import React from "react";
import { List } from "@material-ui/core";
import QuestionDialogChoiceListItem from "./QuestionDialogChoiceListItem";

const QuestionDialogChoiceList = ({ choices }) => {
  return (
    <List>
      {choices.map(choice => (
        <QuestionDialogChoiceListItem key={choice.id} choice={choice} />
      ))}
    </List>
  );
};

export default QuestionDialogChoiceList;
