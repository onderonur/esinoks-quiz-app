import produce from "immer";

const initialState = {};

// A higher order reducer that maps the state slices to keys
const createByKey = (mapActionToKey, reducer) => (
  state = initialState,
  action
) => {
  if (typeof reducer !== "function") {
    throw new Error("Expected reducer to be a function");
  }

  const key = mapActionToKey(action);

  if (key) {
    if (typeof key !== "string") {
      throw new Error("Expected key to be a string");
    }

    return produce(state, draft => {
      draft[key] = reducer(state[key], action);
    });
  }

  return state;
};

export default createByKey;
