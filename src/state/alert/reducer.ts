import {createSlice} from '@reduxjs/toolkit';

import {alertDispatchers} from './dispatchers';
import {ALERT_STATE_NAME, AlertDispatcherName} from './name';
import {AlertState} from './state';

const initialState: AlertState = {
  showAlert: false,
  message: '',
  severity: 'error',
};

const alertSlice = createSlice({
  name: ALERT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Show the alert
    builder.addCase(alertDispatchers[AlertDispatcherName.SHOW_ALERT], (state, {payload}) => {
      state.message = payload.message;
      state.severity = payload.severity;
      state.showAlert = true;
    });
    // Action on alert closed
    builder.addCase(alertDispatchers[AlertDispatcherName.ALERT_CLOSED], (state) => {
      // Don't set the message to an empty string because the alert
      // will start the closing animation after setting `showAlert` to false,
      // which glitches the closing animation.
      state.showAlert = false;
    });
  },
});

export default alertSlice.reducer;
