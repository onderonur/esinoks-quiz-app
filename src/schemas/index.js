import { schema } from "normalizr";

const quiz = new schema.Entity("quizzes");
const question = new schema.Entity("questions");

const schemas = {
  quiz,
  question
};

export default schemas;
