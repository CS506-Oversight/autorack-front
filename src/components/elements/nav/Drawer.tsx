import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import {useAuthSelector} from '../../../state/auth/selector';
import {NavbarButtons} from './ItemButton';
import {getAnonymousOnlyNavItems, getLoggedInOnlyNavItems, NavItemEntry} from './Items';


const useStyles = makeStyles(() => ({
  drawerMenu: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

type NavButtonsProps = DrawerProps & {
  fnGetItems: () => Array<NavItemEntry>,
}

const NavButtons = ({fnGetItems, onItemClicked}: NavButtonsProps) => {
  const style = useStyles();

  return (
    <NavbarButtons
      fnGetItems={fnGetItems}
      onClickHook={onItemClicked}
      className={style.drawerMenu}
    />
  );
};

type DrawerProps = {
  onItemClicked: () => void
}

export const NavDrawer = ({onItemClicked}: DrawerProps) => {
  const {user} = useAuthSelector();

  // User authenticated
  if (user != null) {
    return (
      <NavButtons
        fnGetItems={getLoggedInOnlyNavItems}
        onItemClicked={onItemClicked}
      />
    );
  }

  return (
    <NavButtons
      fnGetItems={getAnonymousOnlyNavItems}
      onItemClicked={onItemClicked}
    />
  );
};
