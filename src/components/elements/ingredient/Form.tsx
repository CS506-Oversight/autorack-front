import React from 'react';

import {Theme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import {defaultMeasure, Ingredient, measureData} from '../../../state/ingredient/data';
import UIInput from '../ui/Input';
import {UISelect} from '../ui/Select';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

export const IngredientForm = () => {
  const classes = useStyles();

  const [ingredient, setIngredient] = React.useState<Ingredient>({
    name: '',
    measure: defaultMeasure,
    unit: 0,
    unitPrice: 0,
  });

  return (
    <form className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UIInput
            name="name"
            value={ingredient.name}
            onValueChanged={(val) => setIngredient({...ingredient, name: val})}
            label="Ingredient Name"
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <UIInput
            name="unit"
            value={ingredient.unit}
            onValueChanged={(val) => setIngredient({...ingredient, unit: +val})}
            label="Ingredient Unit"
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <UISelect
            label="Ingredient Measure"
            value={ingredient.measure}
            options={Object.values(measureData)}
            getOptionLabel={(measure) => measure.name}
            onOptionSelected={(measure) => setIngredient({...ingredient, measure})}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <UIInput
            name="unitPrice"
            value={ingredient.unitPrice}
            onValueChanged={(val) => setIngredient({...ingredient, unitPrice: +val})}
            label="Ingredient Unit Price"
          />
        </Grid>
      </Grid>
    </form>
  );
};
