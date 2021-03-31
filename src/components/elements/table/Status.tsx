import React from 'react';

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

type StatusColor = {
    [key: string]: any; // Must accommodate all members
    primary: {};
    info: {};
    warning: {};
    danger: {};
    success: {};
}

const colors: StatusColor = {
  'primary': '#ccc',
  'info': '#3cc',
  'warning': '#cc3',
  'danger': '#c33',
  'success': '#3c3',
};

type StatusProps = {
    color: string;
}

const Status = ({color, ...rest}: StatusProps) => {
  const classes = useStyles();

  return (
    <span
      {...rest}
      className={classes.root}
      style={{backgroundColor: colors[color]}}
    />
  );
};

export default Status;
