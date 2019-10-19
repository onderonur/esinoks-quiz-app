import React from "react";
import QuestionGridList from "./QuestionGridList";
import QuestionDialog from "./QuestionDialog";
import Journey from "./Journey";

const QuizPage = () => {
  return (
    <>
      <Journey />
      <QuestionGridList />
      <QuestionDialog />
    </>
  );
};

export default QuizPage;
