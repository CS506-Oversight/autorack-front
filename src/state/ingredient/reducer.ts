import {createSlice} from '@reduxjs/toolkit';

import {ingredientDispatchers} from './dispatchers';
import {INGREDIENT_STATE_NAME} from './name';
import {IngredientState} from './state';

const initialState: IngredientState = {
  ingredients: [],
  lastFetch: 0,
};

const ingredientSlice = createSlice({
  name: INGREDIENT_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [
      ingredientDispatchers.loadIngredient.fulfilled,
      ingredientDispatchers.upsertIngredient.fulfilled,
    ].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.ingredients = payload;
          state.lastFetch = Date.now();
        },
      );
    });
    // builder.addCase(
    //   ingredientDispatchers.removeIngredient.fulfilled,
    //   (state, {payload}) => {
    //     state.ingredients = state.ingredients.filter((x) => x.id !== payload);
    //   },
    // );
  },
});

export default ingredientSlice.reducer;
