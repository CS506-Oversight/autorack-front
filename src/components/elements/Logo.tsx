import React from 'react';

import {makeStyles} from '@material-ui/core';

import logo from '../../assets/logo.png';

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
    <a href={'/dashboard'}>
      <img src={logo} className={style.logo} />
    </a>
  );
};

export default AutoRackLogo;
