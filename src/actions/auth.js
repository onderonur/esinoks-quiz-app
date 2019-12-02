import { createAsyncAction } from "./utils";
import { createAction } from "@reduxjs/toolkit";

export const listenAuthState = createAsyncAction("auth/listen", {
  succeeded: authUser => ({ payload: { authUser } }),
  failed: error => ({ payload: { error } })
});

export const socialSignIn = createAsyncAction("auth/socialSignIn", {
  base: provider => ({ payload: { provider } })
});

export const openSignInDialog = createAction("auth/openSignInDialog");
export const closeSignInDialog = createAction("auth/closeSignInDialog");
