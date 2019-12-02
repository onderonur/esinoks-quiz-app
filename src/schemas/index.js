import { schema } from "normalizr";

const quizSchema = new schema.Entity("quizzes");
const questionSchema = new schema.Entity("questions");
const quizListSchema = [quizSchema];
const questionListSchema = [questionSchema];

const schemas = {
  quizSchema,
  questionSchema,
  quizListSchema,
  questionListSchema
};

export default schemas;
