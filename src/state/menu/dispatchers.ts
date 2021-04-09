import {createAsyncThunk} from '@reduxjs/toolkit';

import {mockFetchMenu, mockUpsertMenu} from '../../api/mock/menu/utils';
import {UpsertListPayload} from '../base/payload';
import {Menu} from './data';
import {MENU_STATE_NAME, MenuDispatcherName} from './name';

export const menuDispatchers = {
  [MenuDispatcherName.LOAD_MENU]: createAsyncThunk<Array<Menu>>(
    `${MENU_STATE_NAME}/${MenuDispatcherName.LOAD_MENU}`,
    async () => {
      // TODO: Load ingredient from the database
      return await mockFetchMenu();
    },
  ),
  [MenuDispatcherName.UPSERT_MENU]: createAsyncThunk<Array<Menu>, UpsertListPayload<Menu>>(
    `${MENU_STATE_NAME}/${MenuDispatcherName.UPSERT_MENU}`,
    async ({original, updated}: UpsertListPayload<Menu>) => {
      // TODO: Add ingredient to the database
      return await mockUpsertMenu(original, updated);
    },
  ),
  [MenuDispatcherName.REMOVE_MENU]: createAsyncThunk<string, string>(
    `${MENU_STATE_NAME}/${MenuDispatcherName.REMOVE_MENU}`,
    async (menuId: string) => {
      // TODO: Remove ingredient from the database
      console.log(`Remove menu of ID ${menuId}`);
      return menuId;
    },
  ),
};
