import { getFetchActionTypes } from "utils";
import createReducer from "./createReducer";

const initialState = false;

const createIsFetching = fetchType => {
  const { requestType, successType, errorType } = getFetchActionTypes(
    fetchType
  );

  const reducer = createReducer(initialState, {
    [requestType]: () => true,
    [successType]: () => false,
    [errorType]: () => false
  });

  return reducer;
};

export default createIsFetching;
