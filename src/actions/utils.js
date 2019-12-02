import { createAction } from "@reduxjs/toolkit";

export const createAsyncAction = (
  type,
  { base, requested, succeeded, failed, cancelled } = {}
) => {
  const baseAction = createAction(type, base);
  baseAction.requested = createAction(`${type}/requested`, requested);
  baseAction.succeeded = createAction(`${type}/succeeded`, succeeded);
  baseAction.failed = createAction(`${type}/failed`, failed);
  baseAction.cancelled = createAction(`${type}/cancelled`, cancelled);
  return baseAction;
};
