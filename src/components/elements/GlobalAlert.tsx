import React from 'react';

import {alertDispatchers} from '../../state/alert/dispatchers';
import {useThunkDispatch} from '../../state/store';
import {SnackbarAlert} from './SnackbarAlert';

export const GlobalAlert = () => {
  const {showAlert, severity, message} = useAlertSelector();

  const dispatch = useThunkDispatch();

  const onClose = () => {
    dispatch(alertDispatchers.alertClosed());
  };

  return (
    <SnackbarAlert showAlert={showAlert} message={message} severity={severity} onClose={onClose}/>
  );
};
