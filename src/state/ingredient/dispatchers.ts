import {createAsyncThunk} from '@reduxjs/toolkit';

import {mockAddIngredient} from '../../api/mock/ingredient/utils';
import {Ingredient, IngredientData} from './data';
import {INGREDIENT_STATE_NAME, IngredientDispatcherName} from './name';

export const ingredientDispatchers = {
  [IngredientDispatcherName.ADD_INGREDIENT]: createAsyncThunk<IngredientData, Ingredient>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.ADD_INGREDIENT}`,
    async (ingredient: Ingredient) => {
      // TODO: Add ingredient to the database
      return await mockAddIngredient(ingredient);
    },
  ),
  [IngredientDispatcherName.REMOVE_INGREDIENT]: createAsyncThunk<string, string>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.REMOVE_INGREDIENT}`,
    async (ingredientId: string) => {
      // TODO: Remove ingredient from the database
      console.log(`Remove ingredient of ID ${ingredientId}`);
      return ingredientId;
    },
  ),
  [IngredientDispatcherName.UPDATE_INGREDIENT]: createAsyncThunk<IngredientData, IngredientData>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.UPDATE_INGREDIENT}`,
    async (ingredientData: IngredientData) => {
      // TODO: Update ingredient from the database
      return ingredientData;
    },
  ),
};
