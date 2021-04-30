import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import ApiPaths from '../../api/definitions/paths';
// import fireAuth from '../../config/firebaseConfig';
import {Inventory} from './data';
import {INVENTORY_STATE_NAME, InventoryDispatcherName} from './name';


export const inventoryDispatchers = {
  [InventoryDispatcherName.LOAD_INVENTORY]: createAsyncThunk<Array<Inventory>, string>(
    `${INVENTORY_STATE_NAME}/${InventoryDispatcherName.LOAD_INVENTORY}`,
    async (id: string) => {
      // const user = fireAuth.currentUser;

      const response = await axios.get(ApiPaths.INVENTORY + `?user_id=${id}`).then((res) =>{
        return res.data;
      });

      return response.data;
    },
  ),
};
