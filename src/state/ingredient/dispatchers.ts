import {createAsyncThunk} from '@reduxjs/toolkit';

import {mockUpsertIngredients, mockFetchIngredient} from '../../api/mock/ingredient/utils';
import {UpsertListPayload} from '../base/payload';
import {Ingredient} from './data';
import {INGREDIENT_STATE_NAME, IngredientDispatcherName} from './name';

export const ingredientDispatchers = {
  [IngredientDispatcherName.LOAD_INGREDIENT]: createAsyncThunk<Array<Ingredient>>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.LOAD_INGREDIENT}`,
    async () => {
      // TODO: Load ingredient from the database
      return await mockFetchIngredient();
    },
  ),
  [IngredientDispatcherName.UPSERT_INGREDIENT]: createAsyncThunk<Array<Ingredient>, UpsertListPayload<Ingredient>>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.UPSERT_INGREDIENT}`,
    async ({original, updated}: UpsertListPayload<Ingredient>) => {
      // TODO: Add ingredient to the database
      return await mockUpsertIngredients(original, updated);
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
};
