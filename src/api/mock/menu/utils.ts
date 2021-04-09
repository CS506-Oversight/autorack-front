import {Menu, newMenuId} from '../../../state/menu/data';
import {mockUpsertItems} from '../base/upsert';
import {dummyMenuData} from './data';

export const mockUpsertMenu = async (
  original: Array<Menu>,
  upsert: Array<Menu>,
): Promise<Array<Menu>> => {
  return mockUpsertItems(
    original,
    upsert,
    (ingredient) => ingredient.id,
    newMenuId,
  );
};

export const mockFetchMenu = async (): Promise<Array<Menu>> => {
  // Fetch (generate) menu
  return dummyMenuData;
};
