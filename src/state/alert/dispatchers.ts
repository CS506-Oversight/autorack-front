import {PayloadAction} from '@reduxjs/toolkit';

import {ShowAlertData} from './data';
import {AlertState} from './state';

export enum AlertDispatcherName {
  SHOW_ALERT = 'showAlert',
  ALERT_CLOSED = 'alertClosed',
}

export const alertDispatchers = {
  [AlertDispatcherName.SHOW_ALERT]: (state: AlertState, {payload}: PayloadAction<ShowAlertData>) => {
    state.message = payload.message;
    state.severity = payload.severity;
    state.showAlert = true;
  },
  [AlertDispatcherName.ALERT_CLOSED]: (state: AlertState) => {
    state.message = '';
    state.showAlert = false;
  },
};
