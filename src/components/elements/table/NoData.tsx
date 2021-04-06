import React from 'react';

import {Container, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import nodataImage from '../../../assets/nodata.png';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    marginTop: '10em',
  },
  media: {
    height: '17em',
    marginBottom: '3em',
  },
  text: {
    fontSize: '1.3em',
    color: '#b3b3b3',
  },
});

export const NoData = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <img src={nodataImage} className={classes.media}/>
      <Typography className={classes.text}>There is currently no data</Typography>
    </Container>
  );
};
