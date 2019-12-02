import mergeWith from "lodash.mergewith";
import get from "lodash.get";
import produce from "immer";
import { createReducer } from "@reduxjs/toolkit";

// When the destination value is an array, we simply replace its value by the new one.
const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
};

const createEntitiesSlice = (schemaKey, initialState, handlers = {}) => {
  const reducer = (state, action) => {
    const entitiesSlice = get(action, [
      "payload",
      "response",
      "entities",
      schemaKey
    ]);
    if (entitiesSlice) {
      // Note: "merge" and "mergeWith" mutates the destination object.
      return produce(state, draft => {
        mergeWith(draft, entitiesSlice, customizer);
      });
    } else {
      return createReducer(initialState, handlers)(state, action);
    }
  };

  return reducer;
};

export default createEntitiesSlice;
