import {createSlice} from '@reduxjs/toolkit';

import {menuDispatchers} from './menu_dispatchers';
import {MENU_STATE_NAME, MenuDispatcherName} from './menu_names';
import {MenuState} from './menu_state';

const initialState: MenuState = {
  menuList: [],
  ingredientList: [],
  menuIngredientList: [],
};


const menuSlice = createSlice({
  name: MENU_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [menuDispatchers[MenuDispatcherName.SEND_INGREDIENT].fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          if (!payload) {
            return;
          } else {
            state.ingredientList.push(payload);
          }
        },
      );
    });
    [menuDispatchers[MenuDispatcherName.GET_INGREDIENTS].fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          if (!payload) {
            return;
          } else {
            for (const item of payload) {
              state.ingredientList.push(item);
            }
          }
        },
      );
    });
    [menuDispatchers[MenuDispatcherName.SEND_MENU_ITEMS].fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          if (!payload) {
            return;
          } else {
            for (const item of payload) {
              state.menuList.push(item);
            }
          }
        },
      );
    });

    [menuDispatchers[MenuDispatcherName.GET_MENU_ITEMS].fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          if (!payload) {
            return;
          } else {
            for (const item of payload) {
              state.menuList.push(item);
            }
          }
        },
      );
    });
    [menuDispatchers[MenuDispatcherName.SEND_MENU_INGREDIENTS].fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          if (!payload) {
            return;
          } else {
            for (const item of payload) {
              state.menuIngredientList.push(item);
            }
          }
        },
      );
    });
    [menuDispatchers[MenuDispatcherName.GET_MENU_INGREDIENTS].fulfilled].forEach((thunkCase) => {
      builder.addCase(
        thunkCase,
        (state, {payload}) => {
          if (!payload) {
            return;
          } else {
            for (const item of payload) {
              state.menuIngredientList.push(item);
            }
          }
        },
      );
    });
  },


});

export default menuSlice.reducer;
