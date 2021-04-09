import React from 'react';

import {Color} from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/styles';


const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0,
    height: 15,
    width: 15,
    marginRight: 15,
  },
}));

export type StatusColor = Color | 'primary';

const statusColorMap: {[color in StatusColor]: string} = {
  'primary': '#ccc',
  'info': '#3cc',
  'warning': '#cc3',
  'error': '#c33',
  'success': '#3c3',
};

type StatusProps = {
  color: StatusColor;
}

const Status = ({color, ...rest}: StatusProps) => {
  const classes = useStyles();

  return (
    <span
      {...rest}
      className={classes.root}
      style={{backgroundColor: statusColorMap[color]}}
    />
  );
};

export default Status;
