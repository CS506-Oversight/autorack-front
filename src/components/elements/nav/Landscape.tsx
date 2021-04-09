import React from 'react';

import {makeStyles, Toolbar} from '@material-ui/core';

import AutoRackLogo from '../Logo';
import {NavMenu} from './Menu';

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const NavLandscape = () => {
  const {toolbar} = useStyles();

  return (
    <Toolbar className={toolbar}>
      <AutoRackLogo/>
      <NavMenu/>
    </Toolbar>
  );
};
