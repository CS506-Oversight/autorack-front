import React from 'react';

import {makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
  },
}));

const AutoRackLogo = () => {
  const style = useStyles();

  return (
    <Typography variant="h6" component="h1" className={style.logo}>
      AutoRack
    </Typography>
  );
};

export default AutoRackLogo;
