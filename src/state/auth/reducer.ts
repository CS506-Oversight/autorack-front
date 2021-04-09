import {createSlice} from '@reduxjs/toolkit';

import {authDispatchers} from './dispatchers';
import {AUTH_STATE_NAME} from './name';
import {AuthState} from './state';

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: AUTH_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Set user on either sign-in and sign-up succeed
    [authDispatchers.signUp.fulfilled,
      authDispatchers.signIn.fulfilled,
      authDispatchers.updatePassword.fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.user = payload;
        },
      );
    });
    // Handles forgot password / sign-out
    [authDispatchers.forgotPassword.fulfilled, authDispatchers.signOut.fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state) => {
          state.user = null;
        },
      );
    });
  },
});

export default authSlice.reducer;
