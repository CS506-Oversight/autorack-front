import {createAsyncThunk} from '@reduxjs/toolkit';

import {RestockData} from './restockData';
// TODO: Remove this once backend EPs are implemented
import {dummyData} from './restockDummyData';
import {RESTOCK_STATE_NAME, RestockDispatcherName} from './restockName';

export type RestockActionReturn<R> = R extends RestockData ? R: R;

export const restockDispatchers = {
  [RestockDispatcherName.FETCH_RESTOCK_DATA]: createAsyncThunk<RestockActionReturn<RestockData>>(
    `${RESTOCK_STATE_NAME}/${RestockDispatcherName.FETCH_RESTOCK_DATA}`,
    async () => {
      const data = dummyData;

      return data;
    },
  ),
};
