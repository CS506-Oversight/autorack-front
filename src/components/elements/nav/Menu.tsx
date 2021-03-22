import React from 'react';

import {makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import {authDispatchers} from '../../../state/auth/dispatchers';
import {useAuthSelector} from '../../../state/auth/selector';
import {useThunkDispatch} from '../../../state/store';
import UIButton from '../../elements/ui/Button';
import {navBarItems} from './Items';

const useStyles = makeStyles(() => ({
  menuButton: {
    width: '80px',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  menuFlex: {
    display: 'flex',
    flexDirection: 'row',
  },
  signOutButton: {
    width: '150px',
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
      <div className={style.menuFlex}>
        <UIButton
          className={style.menuButton}
          color="inherit"
          variant="text"
          text={navBarItems[0].label}
          key={navBarItems[0].label}
          to={navBarItems[0].link}
          component={RouterLink}
        />
        <UIButton
          className={style.menuButton}
          to={navBarItems[1].link}
          color="inherit"
          variant="text"
          component={RouterLink}
          key={navBarItems[1].label}
          text={navBarItems[1].label}
        />
      </div>
    </>
  );
};

const IsLoggedInItems = () => {
  const style = useStyles();
  const dispatch = useThunkDispatch();

  return (
    <>
      <UIButton
        className={style.signOutButton}
        color="secondary"
        onClick={() => dispatch(authDispatchers.signOut())}
        key={navBarItems[2].label}
        text={navBarItems[2].label}
        variant="contained"
      />
    </>
  );
};

export const NavMenu = () => {
  const {user} = useAuthSelector();

  return (
    <div>
      {user != null ? <IsLoggedInItems/> : <IsNotLoggedInItems/>}
    </div>
  );
};
