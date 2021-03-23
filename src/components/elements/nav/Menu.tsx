import React from 'react';

import {makeStyles, Button} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';

import {authDispatchers} from '../../../state/auth/dispatchers';
import {ReduxState} from '../../../state/state';
import {useThunkDispatch} from '../../../state/store';
import UIButton from '../../elements/ui/Button';
import {navBarItems} from './Items';

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
      <Button
        className={style.menuButton}
        color="inherit"
        key={navBarItems[0].label}
        to={navBarItems[0].link}
        component={RouterLink}
      >
        {navBarItems[0].label}
      </Button>
      <Button
        className={style.menuButton}
        to={navBarItems[1].link}
        color="inherit"
        component={RouterLink}
        key={navBarItems[1].label}
      >
        {navBarItems[1].label}
      </Button>
    </>
  );
};

const IsLoggedInItems = () => {
  const style = useStyles();
  const dispatch = useThunkDispatch();

  return (
    <>
      <UIButton
        className={style.menuButton}
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
  const {user} = useSelector((state: ReduxState) => state.auth);

  return (
    <div>
      {user != null ? <IsLoggedInItems/> : <IsNotLoggedInItems/>}
    </div>
  );
};
