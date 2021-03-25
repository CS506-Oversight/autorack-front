import React from 'react';

import {Drawer, IconButton, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import AutoRackLogo from '../Logo';
import {NavDrawer} from './Drawer';

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    padding: theme.spacing(theme.typography.pxToRem(20), theme.typography.pxToRem(30)),
  },
}));

export const NavPortrait = () => {
  const style = useStyles();

  const [isDrawerOpened, setDrawerOpened] = React.useState(false);

  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-haspopup={true}
        onClick={() => setDrawerOpened(true)}
      >
        <MenuIcon/>
      </IconButton>

      <Drawer anchor="left" open={isDrawerOpened} onClose={() => setDrawerOpened(false)}>
        <div className={style.drawerContainer}><NavDrawer onItemClicked={() => setDrawerOpened(false)}/></div>
      </Drawer>

      <div><AutoRackLogo/></div>
    </Toolbar>
  );
};
