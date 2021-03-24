import {Button, makeStyles} from '@material-ui/core';
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {navItems} from './Items';

const useStyles = makeStyles(() => ({
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
}));


export const NavMenu = () => {
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
