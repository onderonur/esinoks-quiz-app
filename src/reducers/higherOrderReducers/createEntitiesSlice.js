import merge from "lodash.merge";
import get from "lodash.get";
import createReducer from "./createReducer";

const createEntitiesSlice = (schemaKey, initialState, handlers = {}) =>
  createReducer(initialState, {
    ...handlers,
    default: (state, action) => {
      const entitiesSlice = get(action, ["response", "entities", schemaKey]);
      if (entitiesSlice) {
        return merge(state, entitiesSlice);
      }
    }
  });

export default createEntitiesSlice;
