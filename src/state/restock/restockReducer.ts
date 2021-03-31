import {createSlice} from '@reduxjs/toolkit';

import {restockDispatchers} from './restockDispatchers';
import {RESTOCK_STATE_NAME} from './restockName';
import {RestockState} from './restockState';

const initialState: RestockState = {
  restockData: null,
};

const restockSlice = createSlice({
  name: RESTOCK_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [restockDispatchers.fetchRestockData.fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.restockData = payload;
        },
      );
    });
  },
});

export default restockSlice.reducer;
