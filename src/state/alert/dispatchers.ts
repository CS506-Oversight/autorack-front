import {createAction} from '@reduxjs/toolkit';

import {ShowAlertData} from './data';
import {AlertDispatcherName} from './name';

export const alertDispatchers = {
  [AlertDispatcherName.SHOW_ALERT]: createAction<ShowAlertData>(AlertDispatcherName.SHOW_ALERT),
  [AlertDispatcherName.ALERT_CLOSED]: createAction(AlertDispatcherName.ALERT_CLOSED),
};
