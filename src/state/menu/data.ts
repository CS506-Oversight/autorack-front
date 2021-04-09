import {NamedData} from '../base/data';
import {Ingredient} from '../ingredient/data';

/**
 * Menu data.
 */
export type Menu = NamedData & {
  description: string,
  price: number,
  ingredients: Array<Ingredient>,
}

/**
 * ID that means the ingredient is to be newly added.
 */
export const newMenuId = '(new menu)';
