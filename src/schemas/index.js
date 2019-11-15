import { schema } from "normalizr";

const quiz = new schema.Entity("quizzes");
const question = new schema.Entity("questions");
const quizQuestion = new schema.Entity(
  "quizQuestions",
  {
    questions: [question]
  },
  {
    idAttribute: value => value.quizId
  }
);

const schemas = {
  quiz,
  question,
  quizQuestion
};

export default schemas;
