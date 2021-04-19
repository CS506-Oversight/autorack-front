import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import ApiPaths from '../../api/definitions/paths';
import fireAuth from '../../config/firebaseConfig';
import {UpsertListPayload} from '../base/payload';
import {Menu} from './data';
import {MENU_STATE_NAME, MenuDispatcherName} from './name';

export const menuDispatchers = {
  [MenuDispatcherName.LOAD_MENU]: createAsyncThunk<Array<Menu>>(
    `${MENU_STATE_NAME}/${MenuDispatcherName.LOAD_MENU}`,
    async () => {
      const user = fireAuth.currentUser;
      let id = '';

      if (user != null) {
        id = user.uid;
      }
      const response = await axios.get(ApiPaths.MENU + `?user_id=${id}`)
        .then((res) =>{
          return res.data;
        });

      return response.data;
    },
  ),
  [MenuDispatcherName.UPSERT_MENU]: createAsyncThunk<Array<Menu>, UpsertListPayload<Menu>>(
    `${MENU_STATE_NAME}/${MenuDispatcherName.UPSERT_MENU}`,
    async ({updated}: UpsertListPayload<Menu>) => {
      const user = fireAuth.currentUser;
      let id = '';

      if (user != null) {
        id = user.uid;
      }

      const payloadData: any[] = [];

      updated.forEach((element) => {
        // Format for new ingredients
        if (element.id === '(new menu)') {
          payloadData.push({
            name: element.name,
            description: element.description,
            ingredients: element.ingredients,
          });
        } else { // Format for existing ingredients
          payloadData.push({
            id: element.id,
            name: element.name,
            description: element.description,
            ingredients: element.ingredients,
          });
        }
      });

      const payload = {
        id: id,
        payload: payloadData,
      };

      // Send the data to the backend
      await axios.post(ApiPaths.MENU, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Grab the data from the backend after posting
      const response = await axios.get(ApiPaths.MENU + `?user_id=${id}`)
        .then((res) =>{
          return res.data;
        });

      return response.data;
    },
  ),
};
