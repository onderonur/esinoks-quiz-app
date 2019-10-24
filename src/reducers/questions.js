import createReducer from "./higherOrderReducers/createReducer";
import * as actionTypes from "constants/actionTypes";

export const data = [
  {
    id: "0",
    text: "Which one is true?",
    choices: [
      { id: "0", text: "This is true." },
      { id: "1", text: "This is also true." },
      { id: "2", text: "Maybe this is true." },
      { id: "3", text: "Definitely not this one." }
    ]
  },
  {
    id: "1",
    text: "Is this question cool?",
    choices: [
      { id: "4", text: "OK." },
      { id: "5", text: "No." },
      { id: "6", text: "Yes." },
      { id: "7", text: "Maybe." }
    ]
  },
  {
    id: "2",
    text: "Is this the last question?",
    choices: [
      { id: "8", text: "Who knows" },
      { id: "9", text: "Of course" },
      { id: "10", text: "Definitely" },
      { id: "11", text: "Cool cool cool" }
    ]
  },
  {
    id: "3",
    text: "Which one is true?",
    choices: [
      { id: "12", text: "This is true." },
      { id: "13", text: "This is also true." },
      { id: "14", text: "Maybe this is true." },
      { id: "15", text: "Definitely not this one." }
    ]
  },
  {
    id: "4",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "16", text: "This is true." },
      { id: "17", text: "This is also true." },
      { id: "18", text: "Maybe this is true." },
      {
        id: "19",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "5",
    text: "Which one is true?",
    choices: [
      { id: "20", text: "This is true." },
      { id: "21", text: "This is also true." },
      { id: "22", text: "Maybe this is true." },
      { id: "23", text: "Definitely not this one." }
    ]
  },
  {
    id: "6",
    text: "Is this question cool?",
    choices: [
      { id: "24", text: "OK." },
      { id: "25", text: "No." },
      { id: "26", text: "Yes." },
      { id: "27", text: "Maybe." }
    ]
  },
  {
    id: "7",
    text: "Is this the last question?",
    choices: [
      { id: "28", text: "Who knows" },
      { id: "29", text: "Of course" },
      { id: "30", text: "Definitely" },
      { id: "31", text: "Cool cool cool" }
    ]
  },
  {
    id: "8",
    text: "Which one is true?",
    choices: [
      { id: "32", text: "This is true." },
      { id: "33", text: "This is also true." },
      { id: "34", text: "Maybe this is true." },
      { id: "35", text: "Definitely not this one." }
    ]
  },
  {
    id: "9",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "36", text: "This is true." },
      { id: "37", text: "This is also true." },
      { id: "38", text: "Maybe this is true." },
      {
        id: "39",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "10",
    text: "Which one is true?",
    choices: [
      { id: "40", text: "This is true." },
      { id: "41", text: "This is also true." },
      { id: "42", text: "Maybe this is true." },
      { id: "43", text: "Definitely not this one." }
    ]
  },
  {
    id: "11",
    text: "Is this question cool?",
    choices: [
      { id: "44", text: "OK." },
      { id: "45", text: "No." },
      { id: "46", text: "Yes." },
      { id: "47", text: "Maybe." }
    ]
  },
  {
    id: "12",
    text: "Is this the last question?",
    choices: [
      { id: "48", text: "Who knows" },
      { id: "49", text: "Of course" },
      { id: "50", text: "Definitely" },
      { id: "51", text: "Cool cool cool" }
    ]
  },
  {
    id: "13",
    text: "Which one is true?",
    choices: [
      { id: "52", text: "This is true." },
      { id: "53", text: "This is also true." },
      { id: "54", text: "Maybe this is true." },
      { id: "55", text: "Definitely not this one." }
    ]
  },
  {
    id: "14",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "56", text: "This is true." },
      { id: "57", text: "This is also true." },
      { id: "58", text: "Maybe this is true." },
      {
        id: "59",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "15",
    text: "Which one is true?",
    choices: [
      { id: "60", text: "This is true." },
      { id: "61", text: "This is also true." },
      { id: "62", text: "Maybe this is true." },
      { id: "63", text: "Definitely not this one." }
    ]
  },
  {
    id: "16",
    text: "Is this question cool?",
    choices: [
      { id: "64", text: "OK." },
      { id: "65", text: "No." },
      { id: "66", text: "Yes." },
      { id: "67", text: "Maybe." }
    ]
  },
  {
    id: "17",
    text: "Is this the last question?",
    choices: [
      { id: "68", text: "Who knows" },
      { id: "69", text: "Of course" },
      { id: "70", text: "Definitely" },
      { id: "71", text: "Cool cool cool" }
    ]
  },
  {
    id: "18",
    text: "Which one is true?",
    choices: [
      { id: "72", text: "This is true." },
      { id: "73", text: "This is also true." },
      { id: "74", text: "Maybe this is true." },
      { id: "75", text: "Definitely not this one." }
    ]
  },
  {
    id: "19",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "76", text: "This is true." },
      { id: "77", text: "This is also true." },
      { id: "78", text: "Maybe this is true." },
      {
        id: "79",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "20",
    text: "Which one is true?",
    choices: [
      { id: "80", text: "This is true." },
      { id: "81", text: "This is also true." },
      { id: "82", text: "Maybe this is true." },
      { id: "83", text: "Definitely not this one." }
    ]
  },
  {
    id: "21",
    text: "Is this question cool?",
    choices: [
      { id: "84", text: "OK." },
      { id: "85", text: "No." },
      { id: "86", text: "Yes." },
      { id: "87", text: "Maybe." }
    ]
  },
  {
    id: "22",
    text: "Is this the last question?",
    choices: [
      { id: "88", text: "Who knows" },
      { id: "89", text: "Of course" },
      { id: "90", text: "Definitely" },
      { id: "91", text: "Cool cool cool" }
    ]
  },
  {
    id: "23",
    text: "Which one is true?",
    choices: [
      { id: "92", text: "This is true." },
      { id: "93", text: "This is also true." },
      { id: "94", text: "Maybe this is true." },
      { id: "95", text: "Definitely not this one." }
    ]
  },
  {
    id: "24",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "96", text: "This is true." },
      { id: "97", text: "This is also true." },
      { id: "98", text: "Maybe this is true." },
      {
        id: "99",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "25",
    text: "Which one is true?",
    choices: [
      { id: "100", text: "This is true." },
      { id: "101", text: "This is also true." },
      { id: "102", text: "Maybe this is true." },
      { id: "103", text: "Definitely not this one." }
    ]
  },
  {
    id: "26",
    text: "Is this question cool?",
    choices: [
      { id: "104", text: "OK." },
      { id: "105", text: "No." },
      { id: "106", text: "Yes." },
      { id: "107", text: "Maybe." }
    ]
  },
  {
    id: "27",
    text: "Is this the last question?",
    choices: [
      { id: "108", text: "Who knows" },
      { id: "109", text: "Of course" },
      { id: "110", text: "Definitely" },
      { id: "111", text: "Cool cool cool" }
    ]
  },
  {
    id: "28",
    text: "Which one is true?",
    choices: [
      { id: "112", text: "This is true." },
      { id: "113", text: "This is also true." },
      { id: "114", text: "Maybe this is true." },
      { id: "115", text: "Definitely not this one." }
    ]
  },
  {
    id: "29",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "116", text: "This is true." },
      { id: "117", text: "This is also true." },
      { id: "118", text: "Maybe this is true." },
      {
        id: "119",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "30",
    text: "Which one is true?",
    choices: [
      { id: "120", text: "This is true." },
      { id: "121", text: "This is also true." },
      { id: "122", text: "Maybe this is true." },
      { id: "123", text: "Definitely not this one." }
    ]
  },
  {
    id: "31",
    text: "Is this question cool?",
    choices: [
      { id: "124", text: "OK." },
      { id: "125", text: "No." },
      { id: "126", text: "Yes." },
      { id: "127", text: "Maybe." }
    ]
  },
  {
    id: "32",
    text: "Is this the last question?",
    choices: [
      { id: "128", text: "Who knows" },
      { id: "129", text: "Of course" },
      { id: "130", text: "Definitely" },
      { id: "131", text: "Cool cool cool" }
    ]
  },
  {
    id: "33",
    text: "Which one is true?",
    choices: [
      { id: "132", text: "This is true." },
      { id: "133", text: "This is also true." },
      { id: "134", text: "Maybe this is true." },
      { id: "135", text: "Definitely not this one." }
    ]
  },
  {
    id: "34",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "136", text: "This is true." },
      { id: "137", text: "This is also true." },
      { id: "138", text: "Maybe this is true." },
      {
        id: "139",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  },
  {
    id: "35",
    text: "Which one is true?",
    choices: [
      { id: "140", text: "This is true." },
      { id: "141", text: "This is also true." },
      { id: "142", text: "Maybe this is true." },
      { id: "143", text: "Definitely not this one." }
    ]
  },
  {
    id: "36",
    text: "Is this question cool?",
    choices: [
      { id: "144", text: "OK." },
      { id: "145", text: "No." },
      { id: "146", text: "Yes." },
      { id: "147", text: "Maybe." }
    ]
  },
  {
    id: "37",
    text: "Is this the last question?",
    choices: [
      { id: "148", text: "Who knows" },
      { id: "149", text: "Of course" },
      { id: "150", text: "Definitely" },
      { id: "151", text: "Cool cool cool" }
    ]
  },
  {
    id: "38",
    text: "Which one is true?",
    choices: [
      { id: "152", text: "This is true." },
      { id: "153", text: "This is also true." },
      { id: "154", text: "Maybe this is true." },
      { id: "155", text: "Definitely not this one." }
    ]
  },
  {
    id: "39",
    text:
      "Which one is true? Which one is true? Which one is true? Which one is true? Which one is true? Which one is true?",
    choices: [
      { id: "156", text: "This is true." },
      { id: "157", text: "This is also true." },
      { id: "158", text: "Maybe this is true." },
      {
        id: "159",
        text:
          "Definitely not this one. Definitely not this one. Definitely not this one. Definitely not this one."
      }
    ]
  }
];

const createInitialState = () => {
  const byId = {};
  const allIds = [];
  data.forEach(question => {
    byId[question.id] = question;
    allIds.push(question.id);
  });
  return {
    byId,
    allIds
  };
};

const initialState = createInitialState();

const questions = createReducer(initialState, {
  [actionTypes.RECEIVE_QUIZ_QUESTIONS]: (state, { questions }) => {
    const newAllIds = questions.map(question => question.id);

    state.allIds.forEach(id => {
      if (!newAllIds.includes(id)) {
        delete state.byId[id];
      }
    });

    questions.forEach(question => {
      state.byId[question.id] = question;
    });

    state.allIds = newAllIds;
  }
});

export default questions;

export const selectors = {
  selectAllQuestionIds: state => state.allIds,
  selectQuestionIndexById: (state, questionId) =>
    state.allIds.indexOf(questionId),
  selectTotalQuestionsCount: state => state.allIds.length,
  selectQuestionById: (state, questionId) => state.byId[questionId]
};
