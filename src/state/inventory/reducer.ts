import {createSlice} from '@reduxjs/toolkit';

import {inventoryDispatchers} from './dispatchers';
import {INVENTORY_STATE_NAME} from './name';
import {InventoryState} from './state';


const initialState: InventoryState = {
  inventory: [],
};

const inventorySlice = createSlice({
  name: INVENTORY_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [
      inventoryDispatchers.loadInventory.fulfilled,
    ].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.inventory = payload;
        },
      );
    });
  },
});

export default inventorySlice.reducer;
