import {createSlice} from '@reduxjs/toolkit';

import {volumeMeasureData} from './data';
import {ingredientDispatchers} from './dispatchers';
import {INGREDIENT_STATE_NAME} from './name';
import {IngredientState} from './state';

const initialState: IngredientState = {
  ingredients: [{
    id: 'axpeax',
    name: 'sample ingredient',
    measurement: volumeMeasureData.ml,
    unit: 10,
    unitPrice: 87,
  }],
};

const ingredientSlice = createSlice({
  name: INGREDIENT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      ingredientDispatchers.addIngredient.fulfilled,
      (state, {payload}) => {
        state.ingredients.push(payload);
      },
    );
    builder.addCase(
      ingredientDispatchers.removeIngredient.fulfilled,
      (state, {payload}) => {
        state.ingredients = state.ingredients.filter((x) => x.id !== payload);
      },
    );
    builder.addCase(
      ingredientDispatchers.updateIngredient.fulfilled,
      (state, {payload}) => {
        state.ingredients.forEach((ingredient, idx) => {
          if (ingredient.id !== payload.id) {
            return;
          }

          state.ingredients[idx] = payload;
        });
      },
    );
  },
});

export default ingredientSlice.reducer;
