import React, {useEffect, useState} from 'react';

import {AppBar, makeStyles, Theme} from '@material-ui/core';

import {NavLandscape} from './Landscape';
import {NavPortrait} from './Portrait';

const useStyles = makeStyles((theme: Theme) => ({
  navBar: {
    backgroundColor: '#3f51b5',
    paddingRight: theme.typography.pxToRem(79),
    paddingLeft: theme.typography.pxToRem(118),
    [theme.breakpoints.down(900)]: {
      paddingLeft: 0,
    },
  },
  navHeader: {
    marginBottom: '5em',
  },
}));

export const Navigation = () => {
  const style = useStyles();

  const [isPortrait, setIsPortrait] = useState(false);

  // Set the responsiveness upon mounted and resize
  useEffect(() => {
    const setResponsiveness = () => {
      return setIsPortrait(window.innerWidth < 900);
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());
  }, []);


  return (
    <header className={style.navHeader}>
      <AppBar className={style.navBar} >
        {isPortrait ? <NavPortrait/> : <NavLandscape/>}
      </AppBar>
    </header>
  );
};
