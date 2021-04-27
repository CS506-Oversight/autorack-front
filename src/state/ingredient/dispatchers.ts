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
        const payload: any = {
          name: element.name,
          currentStock: element.currentStock,
          capacity: element.capacity,
          measure: element.measure,
          capacityEquivalent: element.capacityEquivalent,
          capacityMeasure: element.capacityMeasure,
          currentStockEquivalent: element.currentStockEquivalent,
        };
        // Format for existing ingredients
        if (element.id !== '(new)') {
          payload.id = element.id;
        }

        payloadData.push(payload);
      });

      const payload = {
        payload: payloadData,
      };

      // Send the data to the backend
      await axios.post(ApiPaths.INGREDIENT + `?user_id=${id}`, JSON.stringify(payload), {
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
