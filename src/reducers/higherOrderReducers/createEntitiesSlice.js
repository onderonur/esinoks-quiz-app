import merge from "lodash.merge";
import get from "lodash.get";
import createReducer from "./createReducer";

const createEntitiesSlice = (sliceName, initialState, handlers = {}) =>
  createReducer(initialState, {
    ...handlers,
    default: (state, action) => {
      const entitiesSlice = get(action, ["response", "entities", sliceName]);
      if (entitiesSlice) {
        return merge(state, entitiesSlice);
      }
    }
  });

export default createEntitiesSlice;
