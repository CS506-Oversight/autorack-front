import React from 'react';

import Grid from '@material-ui/core/Grid';

import {getMeasureOfSameCategory, Ingredient, measureData} from '../../../state/ingredient/data';
import UIInput from '../ui/Input';
import {UISelect} from '../ui/Select';


type IngredientFormProps<T extends Ingredient> = {
  ingredient: T,
  setIngredient: (newIngredient: T) => void,
  isAddAllowed?: boolean,
}

export const IngredientForm = <T extends Ingredient>(
  {ingredient, setIngredient, isAddAllowed = false}: IngredientFormProps<T>,
) => {
  const colWidth = isAddAllowed ? 4 : 6;

  let measurements;

  if (isAddAllowed) {
    measurements = Object.values(measureData);
  } else {
    measurements = getMeasureOfSameCategory(ingredient.measure);
  }

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
      <Grid item sm={12} md={colWidth}>
        <UIInput
          name="unit"
          value={ingredient.unit}
          onValueChanged={(val) => setIngredient({...ingredient, unit: +val})}
          label={isAddAllowed ? 'Current In-stock' : 'Unit Amount'}
          type="number"
        />
      </Grid>
      <Grid item sm={12} md={colWidth}>
        <UISelect
          name="measure"
          label="Ingredient Measure"
          value={ingredient.measure}
          options={measurements}
          getOptionLabel={(measure) => measure.name}
          getOptionSelected={(option, value) => option.name === value.name}
          onOptionSelected={(measure) => setIngredient({...ingredient, measure})}
        />
      </Grid>
      {
        isAddAllowed &&
        <Grid item sm={12} md={colWidth}>
          <UIInput
            name="capacity"
            value={ingredient.capacity}
            onValueChanged={(val) => setIngredient({...ingredient, capacity: +val})}
            label="Max. Capacity"
            type="number"
          />
        </Grid>
      }
    </>
  );
};
