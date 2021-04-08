import React from 'react';

import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import UIInput from '../elements/ui/Input';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }),
);

export const IngredientManagement = () => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <UIInput/>
    </form>
  );
};
