import {createSlice} from '@reduxjs/toolkit';

/* import {menuDispatchers} from './menu_dispatchers';*/
import {MENU_STATE_NAME} from './menu_names';
import {MenuState} from './menu_state';

const initialState: MenuState = {
  menuList: [],
  ingredientList: [],
  menuIngredientList: [],
};


// Might need to add more here
const menuSlice = createSlice({
  name: MENU_STATE_NAME,
  initialState,
  reducers: {},
});

export default menuSlice.reducer;
