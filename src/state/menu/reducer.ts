import {createSlice} from '@reduxjs/toolkit';

import {menuDispatchers} from './dispatchers';
import {MENU_STATE_NAME} from './name';
import {MenuState} from './state';

const initialState: MenuState = {
  menus: [],
  lastFetch: 0,
};

const menuSlice = createSlice({
  name: MENU_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [menuDispatchers.loadMenu.fulfilled, menuDispatchers.upsertMenu.fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          state.menus = payload;
          state.lastFetch = Date.now();
        },
      );
    });
    // builder.addCase(
    //   menuDispatchers.removeMenu.fulfilled,
    //   (state, {payload}) => {
    //     state.menus = state.menus.filter((x) => x.id !== payload);
    //   },
    // );
  },
});

export default menuSlice.reducer;
