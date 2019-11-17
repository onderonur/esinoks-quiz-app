import createReducer from "./createReducer";
import { _REQUESTED, _SUCCEEDED, _FAILED, _CANCELLED } from "actions";

const initialState = false;

const createIsFetching = fetchTypes => {
  const reducer = createReducer(initialState, {
    [fetchTypes[_REQUESTED]]: () => true,
    [fetchTypes[_SUCCEEDED]]: () => false,
    [fetchTypes[_FAILED]]: () => false,
    [fetchTypes[_CANCELLED]]: () => false
  });

  return reducer;
};

export default createIsFetching;
