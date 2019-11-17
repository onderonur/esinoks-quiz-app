import mergeWith from "lodash.mergewith";
import get from "lodash.get";
import createReducer from "./createReducer";

// When the destination value is an array, we simply replace its value by the new one.
const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
};

const createEntitiesSlice = (schemaKey, initialState, handlers = {}) =>
  createReducer(initialState, {
    ...handlers,
    default: (state, action) => {
      const entitiesSlice = get(action, ["response", "entities", schemaKey]);
      if (entitiesSlice) {
        // Note: "merge" and "mergeWith" mutates the destination object.
        return mergeWith(state, entitiesSlice, customizer);
      }
    }
  });

export default createEntitiesSlice;
