import {Ingredient} from '../ingredient/data';

/**
 * Menu data.
 */
export type Menu = {
  id: string,
  name: string,
  description: string,
  price: number,
  ingredients: Array<Ingredient>,
}

/**
 * ID that means the ingredient is to be newly added.
 */
export const newMenuId = '(new menu)';

export type UpsertMenuPayload = {
  originalMenu: Array<Menu>,
  updatedMenu: Array<Menu>,
}
