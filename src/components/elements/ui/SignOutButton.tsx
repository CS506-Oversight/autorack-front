import React from 'react';

import {Button, makeStyles} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import {authDispatchers} from '../../../state/auth/dispatchers';

const useStyles = makeStyles(() => ({
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
}));

export const SignOutButton = () => {
  const style = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(authDispatchers.signOut(null));
  };

  return (
    <>
      <Button
        className={style.menuButton}
        color="secondary"
        onClick={handleClick}
        key={'Sign Out'}
        variant="contained"
      >
        {'Sign Out'}
      </Button>
    </>
  );
};
