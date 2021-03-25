import React from 'react';

import Alert from '@material-ui/lab/Alert';

// No type definitions available yet
// https://material-ui.com/components/alert/
type AlertSeverity = 'error' | 'warning' | 'success' | 'info';

type MessageProps = React.PropsWithChildren<{
  type: AlertSeverity;
}>;

const Message = ({children, type}: MessageProps) => {
  return <Alert severity={type}>{children}</Alert>;
};

export default Message;
