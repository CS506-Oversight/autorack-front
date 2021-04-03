import React from 'react';

import {makeStyles} from '@material-ui/core';

import logo from '../../assets/logo.svg';

const useStyles = makeStyles(() => ({
  logo: {
    paddingTop: '.7em',
    width: '120px',
    textAlign: 'left',
  },
}));

const AutoRackLogo = () => {
  const style = useStyles();

  return (
    <img src={logo} className={style.logo} />
  );
};

export default AutoRackLogo;
