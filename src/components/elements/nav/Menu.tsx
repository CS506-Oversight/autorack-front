import React from 'react';

import {makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import AppPaths from '../../../const/paths';
import {useAuthSelector} from '../../../state/auth/selector';
import {useDispatch} from '../../../state/store';
import UIButton from '../../elements/ui/Button';
import {navBarItems, NavItemEntry} from './Items';

const useStyles = makeStyles(() => ({
  menuButton: {
    padding: '0.3rem 1rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '1.2rem',
    marginLeft: '1rem',
    whiteSpace: 'nowrap', // No line break
  },
  menuFlex: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const generateNavBarButtons = (filter: (navItem: NavItemEntry) => boolean) => {
  const style = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={style.menuFlex}>
      {
        navBarItems
          .filter(filter)
          .map((navItem) => (
            <UIButton
              className={style.menuButton}
              color="inherit"
              variant="text"
              text={navItem.label}
              key={navItem.label}
              to={navItem.link}
              onClick={navItem.onClick && navItem.onClick(dispatch)}
              component={RouterLink}
            />
          ))
      }
    </div>
  );
};

const ItemsWhenAnonymous = () => {
  return generateNavBarButtons((navItem) => navItem.displayWhenAnonymous);
};

const ItemsWhenLoggedIn = () => {
  return generateNavBarButtons((navItem) => navItem.link === AppPaths.SIGN_OUT);
};

export const NavMenu = () => {
  const {user} = useAuthSelector();

  return (
    <div>
      {user != null ? <ItemsWhenLoggedIn/> : <ItemsWhenAnonymous/>}
    </div>
  );
};
