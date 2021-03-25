import React from 'react';

import {makeStyles} from '@material-ui/core';

import {useAuthSelector} from '../../../state/auth/selector';
import {NavbarButtons} from './ItemButton';
import {getAnonymousOnlyNavItems, getLoggedInOnlyNavItems} from './Items';

const useStyles = makeStyles(() => ({
  navMenu: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const NavMenu = () => {
  const style = useStyles();
  const {user} = useAuthSelector();

  // User authenticated
  if (user != null) {
    return <NavbarButtons fnGetItems={getLoggedInOnlyNavItems} className={style.navMenu}/>;
  }

  return <NavbarButtons fnGetItems={getAnonymousOnlyNavItems} className={style.navMenu}/>;
};
