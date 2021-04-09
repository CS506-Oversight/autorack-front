import {createSlice} from '@reduxjs/toolkit';

import {menuDispatchers} from './dispatchers';
import {MENU_STATE_NAME} from './name';
import {MenuState} from './state';

const initialState: MenuState = {
  menu: [],
  lastFetch: 0,
};

const menuSlice = createSlice({
  name: MENU_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      menuDispatchers.upsertMenu.fulfilled,
      (state, {payload}) => {
        state.menu = payload;
      },
    );
    builder.addCase(
      menuDispatchers.loadMenu.fulfilled,
      (state, {payload}) => {
        state.menu = payload;
        state.lastFetch = Date.now();
      },
    );
    builder.addCase(
      menuDispatchers.removeMenu.fulfilled,
      (state, {payload}) => {
        state.menu = state.menu.filter((x) => x.id !== payload);
      },
    );
  },
});

export default menuSlice.reducer;
