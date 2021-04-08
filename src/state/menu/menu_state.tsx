import {StateBase} from '../base';
import {Ingredient, MenuIngredient, MenuItem} from './menu_data';

export type MenuState = StateBase & {
    menuList: Array<MenuItem> | [],
    ingredientList : Array<Ingredient> | [],
    menuIngredientList: Array<MenuIngredient> | [],
}
