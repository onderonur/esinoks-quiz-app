import { produce } from "immer";

const createReducer = (initialState, caseReducers) => {
  return function reducer(state = initialState, action) {
    if (caseReducers.hasOwnProperty(action.type)) {
      // Using immer to allow state mutations to simplify reducers
      const caseReducer = caseReducers[action.type];
      return produce(state, draft => caseReducer(draft, action));
    } else {
      const { default: defaultCaseReducer } = caseReducers;
      if (defaultCaseReducer) {
        return produce(state, draft => defaultCaseReducer(draft, action));
      } else {
        return state;
      }
    }
  };
};

export default createReducer;
