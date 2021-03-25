import React from 'react';

import {Link, makeStyles, MenuItem} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';

import {rootState} from '../../../state/reducer';
import {SignOutButton} from '../ui/SignOutButton';
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
  const {user} = useSelector((state: rootState) => state.auth);
  const style = useStyles();


  return (
    <>
      {/* THIS IS A HACK FOR NOW, WILL CHANGE LATER */}
      {user ? <SignOutButton /> :

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
