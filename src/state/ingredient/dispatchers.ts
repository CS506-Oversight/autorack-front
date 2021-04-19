import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import ApiPaths from '../../api/definitions/paths';
import {mockUpsertIngredients} from '../../api/mock/ingredient/utils';
import fireAuth from '../../config/firebaseConfig';
import {UpsertListPayload} from '../base/payload';
import {Ingredient} from './data';
import {INGREDIENT_STATE_NAME, IngredientDispatcherName} from './name';

export const ingredientDispatchers = {
  [IngredientDispatcherName.LOAD_INGREDIENT]: createAsyncThunk<Array<Ingredient>>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.LOAD_INGREDIENT}`,
    async () => {
      const user = fireAuth.currentUser;
      let id = '';

      if (user != null) {
        id = user.uid;
      }
      const response = await axios.get(ApiPaths.INGREDIENT + `?user_id=${id}`)
        .then((res) =>{
          return res.data;
        });

      return response.data;
    },
  ),
  [IngredientDispatcherName.UPSERT_INGREDIENT]: createAsyncThunk<Array<Ingredient>, UpsertListPayload<Ingredient>>(
    `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.UPSERT_INGREDIENT}`,
    async ({original, updated}: UpsertListPayload<Ingredient>) => {
      // TODO: Add ingredient to the database
      console.log(updated);
      return await mockUpsertIngredients(original, updated);
    },
  ),
  // [IngredientDispatcherName.REMOVE_INGREDIENT]: createAsyncThunk<string, string>(
  //   `${INGREDIENT_STATE_NAME}/${IngredientDispatcherName.REMOVE_INGREDIENT}`,
  //   async (ingredientId: string) => {
  //     // TODO: Remove ingredient from the database
  //     console.log(`Remove ingredient of ID ${ingredientId}`);
  //     return ingredientId;
  //   },
  // ),
};
