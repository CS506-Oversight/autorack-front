import {createSlice} from '@reduxjs/toolkit';

import {authDispatchers} from './dispatchers';
import {AuthState} from './state';

const initialState: AuthState = {
  user: null,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
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
    // Set error on set-error called or actions rejected
    [authDispatchers.setError.fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.error = payload;
        },
      );
    });
    Object.values(authDispatchers).map((dispatcher) => dispatcher.rejected).forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        ((state, action) => {
          state.error = `Async thunk promise rejected for action ${action.type}`;
        }),
      );
    });
  },
});

export default authSlice.reducer;
