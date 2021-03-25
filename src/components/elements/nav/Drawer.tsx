import React from 'react';

import {Link, makeStyles, MenuItem} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import {navItems} from './Items';

const useStyles = makeStyles(() => ({
  drawer: {
    textDecoration: 'none',
  },
}));


type DrawerProps = {
  onItemClicked: () => void
}


export const NavDrawer = ({onItemClicked}: DrawerProps) => {
  const style = useStyles();

  return (
    <>
      {
        navItems.map((entry) => {
          return (
            <Link
              key={entry.label}
              component={RouterLink}
              to={entry.link}
              color="inherit"
              className={style.drawer}
              onClick={onItemClicked}
            >
              <MenuItem>{entry.label}</MenuItem>
            </Link>
          );
        })
      }
    </>
  );
};
