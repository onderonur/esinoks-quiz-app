import { produce } from "immer";

const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      // Using immer to allow state mutations to simplify reducers
      const caseReducer = handlers[action.type];
      return produce(state, draft => caseReducer(draft, action));
    } else {
      const { default: defaultHandler } = handlers;
      if (defaultHandler) {
        return produce(state, draft => defaultHandler(draft, action));
      } else {
        return state;
      }
    }
  };
};

export default createReducer;
