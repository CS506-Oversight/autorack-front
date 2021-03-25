import React from 'react';

import {Button, makeStyles} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';

import {rootState} from '../../../state/reducer';
import {SignOutButton} from '../ui/SignOutButton';
import {navItems} from './Items';

const useStyles = makeStyles(() => ({
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
}));

const IsNotLoggedInItems = () => {
  const style = useStyles();
  return (
    <>
      {
        navItems.map((entry) => (
          <Button
            className={style.menuButton}
            to={entry.link}
            color="inherit"
            component={RouterLink}
            key={entry.label}
          >
            {entry.label}
          </Button>
        ))
      }
    </>
  );
};

const IsLoggedInItems = () => {
  return (
    <>
      <SignOutButton />
    </>
  );
};

export const NavMenu = () => {
  const {user} = useSelector((state: rootState) => state.auth);

  return (
    <>
      <div>
        {user ? <IsLoggedInItems /> : <IsNotLoggedInItems />}
      </div>

    </>
  );
};
