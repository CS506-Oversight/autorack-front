import {createSlice} from '@reduxjs/toolkit';

import {AlertDispatcherName, alertDispatchers} from './dispatchers';
import {AlertState} from './state';

const initialState: AlertState = {
  showAlert: false,
  message: '',
  severity: 'error',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    [AlertDispatcherName.SHOW_ALERT]: alertDispatchers[AlertDispatcherName.SHOW_ALERT],
    [AlertDispatcherName.ALERT_CLOSED]: alertDispatchers[AlertDispatcherName.ALERT_CLOSED],
  },
});

export default alertSlice.reducer;
