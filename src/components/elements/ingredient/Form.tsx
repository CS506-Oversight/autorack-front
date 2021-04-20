import React from 'react';

import Grid from '@material-ui/core/Grid';

import {Ingredient, measureData} from '../../../state/ingredient/data';
import UIInput from '../ui/Input';
import {UISelect} from '../ui/Select';


type IngredientFormProps<T extends Ingredient> = {
  ingredient: T,
  setIngredient: (newIngredient: T) => void,
}

export const IngredientForm = <T extends Ingredient>(
  {ingredient, setIngredient}: IngredientFormProps<T>,
) => {
  return (
    <>
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
          type="number"
        />
      </Grid>
      <Grid item sm={12} md={4}>
        <UISelect
          name="measure"
          label="Ingredient Measure"
          value={ingredient.measure}
          options={Object.values(measureData)}
          getOptionLabel={(measure) => measure.name}
          getOptionSelected={(option, value) => option.name === value.name}
          onOptionSelected={(measure) => setIngredient({...ingredient, measure})}
        />
      </Grid>
    </>
  );
};
