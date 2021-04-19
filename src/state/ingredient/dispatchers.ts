import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import ApiPaths from '../../api/definitions/paths';
// import {mockUpsertIngredients} from '../../api/mock/ingredient/utils';
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
    async ({updated}: UpsertListPayload<Ingredient>) => {
      const user = fireAuth.currentUser;
      let id = '';

      if (user != null) {
        id = user.uid;
      }

      const payloadData: any[] = [];

      updated.forEach((element) => {
        // Format for new ingredients
        if (element.id === '(new)') {
          payloadData.push({
            name: element.name,
            unit: element.unit,
            measure: element.measure,
          });
        } else { // Format for existing ingredients
          payloadData.push({
            id: element.id,
            name: element.name,
            unit: element.unit,
            measure: element.measure,
          });
        }
      });

      const payload = {
        id: id,
        payload: payloadData,
      };

      // Send the data to the backend
      await axios.post(ApiPaths.INGREDIENT, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Grab the data from the backend after posting
      const response = await axios.get(ApiPaths.INGREDIENT + `?user_id=${id}`)
        .then((res) =>{
          return res.data;
        });

      return response.data;
    },
  ),
};
