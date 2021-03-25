import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import {SnackbarCloseReason} from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps, Color} from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export type SnackBarAlertProps = {
  showAlert: boolean,
}

type SnackBarAlertPrivateProps = SnackBarAlertProps & {
  onClose: (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => void,
  message: string,
  severity?: Color,
  autoCloseDuration?: number
}

export const SnackbarAlert = ({
  showAlert,
  onClose,
  message,
  severity = 'error',
  autoCloseDuration = 6000,
}: SnackBarAlertPrivateProps) => {
  return (
    <Snackbar open={showAlert} autoHideDuration={autoCloseDuration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
