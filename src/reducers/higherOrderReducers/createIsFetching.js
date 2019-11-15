import { getFetchTypes } from "utils";
import createReducer from "./createReducer";

const initialState = false;

const createIsFetching = fetchType => {
  const { requested, succeeded, failed } = getFetchTypes(fetchType);

  const reducer = createReducer(initialState, {
    [requested]: () => true,
    [succeeded]: () => false,
    [failed]: () => false
  });

  return reducer;
};

export default createIsFetching;
