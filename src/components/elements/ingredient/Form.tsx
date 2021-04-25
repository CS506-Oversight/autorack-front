import React from 'react';

import Grid from '@material-ui/core/Grid';

import {
  ensureIngredientValid,
  getMeasureOfSameCategory,
  Ingredient,
  measureData,
} from '../../../state/ingredient/data';
import UIInput from '../ui/Input';
import UIInputNumber from '../ui/InputNumber';
import {UISelect} from '../ui/Select';


type IngredientFormProps<T extends Ingredient> = {
  ingredient: T,
  setIngredient: (newIngredient: T) => void,
  isAddAllowed?: boolean,
}

export const IngredientForm = <T extends Ingredient>({
  ingredient,
  setIngredient,
  isAddAllowed = false,
}: IngredientFormProps<T>) => {
  const colWidth = isAddAllowed ? 3 : 6;

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
        <UIInputNumber
          name="unit"
          value={ingredient.currentStock}
          onValueChanged={(val) => {
            ingredient.currentStock = val;
            setIngredient(ensureIngredientValid(ingredient));
          }}
          label={isAddAllowed ? 'Current In-stock' : 'Unit Amount'}
          isPositiveOnly
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
          onOptionSelected={(measure) => {
            ingredient.measure = measure;
            setIngredient(ensureIngredientValid(ingredient));
          }}
        />
      </Grid>
      {
        isAddAllowed &&
        <>
          <Grid item sm={12} md={colWidth}>
            <UIInputNumber
              name="capacity"
              value={ingredient.capacity}
              onValueChanged={(val) => {
                ingredient.capacity = val;
                setIngredient(ensureIngredientValid(ingredient));
              }}
              label="Max. Capacity"
              isPositiveOnly
            />
          </Grid>
          <Grid item sm={12} md={colWidth}>
            <UISelect
              name="capacityMeasure"
              label="Capacity Measure"
              value={ingredient.capacityMeasure}
              options={getMeasureOfSameCategory(ingredient.capacityMeasure)}
              getOptionLabel={(measure) => measure.name}
              getOptionSelected={(option, value) => option.name === value.name}
              onOptionSelected={(capacityMeasure) => {
                ingredient.capacityMeasure = capacityMeasure;
                setIngredient(ensureIngredientValid(ingredient));
              }}
            />
          </Grid>
        </>
      }
      <Grid item xs={12}>
        <small>Changing the current in-stock measurement resets the capacity measurement if the type changes.</small>
      </Grid>
    </>
  );
};
