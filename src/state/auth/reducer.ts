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
    [authDispatchers.signUp.fulfilled, authDispatchers.signIn.fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.user = payload;
        },
      );
    });
    // Remove user (set to null) on sign out
    builder.addCase(
      authDispatchers.signOut.fulfilled,
      (state) => {
        state.user = null;
      },
    );
  },
});

export default authSlice.reducer;
