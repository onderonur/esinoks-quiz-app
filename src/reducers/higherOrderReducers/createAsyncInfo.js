import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null
};

const requested = state => {
  state.isFetching = true;
  state.error = null;
};

const succeeded = state => {
  state.isFetching = false;
  state.error = null;
};

const failed = (state, action) => {
  state.isFetching = false;
  state.error = action.payload.error;
};

const cancelled = state => {
  state.isFetching = false;
  state.error = null;
};

const createAsyncInfo = fetchTypes => {
  const reducer = createReducer(initialState, {
    [fetchTypes.requested]: requested,
    [fetchTypes.succeeded]: succeeded,
    [fetchTypes.failed]: failed,
    [fetchTypes.cancelled]: cancelled
  });

  return reducer;
};

export default createAsyncInfo;

export const selectors = {
  selectAsyncInfo: state => state || {}
};
