import {createAsyncThunk} from '@reduxjs/toolkit';

import {Ingredient, MenuItem, MenuIngredient} from './menu_data';
import {MENU_STATE_NAME, MenuDispatcherName} from './menu_names';

export type IngredientActionReturn<R> = R extends Ingredient ? (R | null): R;
export type GetIngredientActionReturn<R> = R extends Array<Ingredient> ? (R | null): R;
export type MenuItemsActionReturn<R> = R extends Array<MenuItem> ? (R | null): R;
export type MenuIngredientsActionReturn<R> = R extends Array<MenuIngredient> ? (R | null): R;

export const menuDispatchers = {
  [MenuDispatcherName.SEND_INGREDIENT]: createAsyncThunk<IngredientActionReturn<Ingredient | null>, Ingredient>(
    `${MENU_STATE_NAME}/${MenuDispatcherName.SEND_INGREDIENT}`,
    async (newIngredient: Ingredient, {rejectWithValue}) => {
      if (!newIngredient) {
        rejectWithValue('No Ingredient');
        return null;
      }
      console.log(newIngredient);
      // TODO: Send Ingredient to the database
      return newIngredient;
    },
  ),
  [MenuDispatcherName.SEND_MENU_ITEMS]: createAsyncThunk<MenuItemsActionReturn<Array<MenuItem> | null>,
      Array<MenuItem>>(
        `${MENU_STATE_NAME}/${MenuDispatcherName.SEND_MENU_ITEMS}`,
        async (menuItems: Array<MenuItem>, {rejectWithValue}) => {
          if (!menuItems) {
            rejectWithValue('No Menu Items');
            return null;
          }
          console.log(menuItems);
          // TODO: Send Menu items to the database
          return menuItems;
        },
      ),
  [MenuDispatcherName.SEND_MENU_INGREDIENTS]: createAsyncThunk<MenuIngredientsActionReturn<Array<
      MenuIngredient> | null>, Array<MenuIngredient>>(
        `${MENU_STATE_NAME}/${MenuDispatcherName.SEND_MENU_INGREDIENTS}`,
        async (menuIngredients: Array<MenuIngredient>, {rejectWithValue}) => {
          if (!menuIngredients) {
            rejectWithValue('No Menu Items');
            return null;
          }
          console.log(menuIngredients);
          // TODO: Send menu-ingredients to the database
          return menuIngredients;
        },
      ),
  [MenuDispatcherName.GET_INGREDIENTS]: createAsyncThunk<GetIngredientActionReturn<Array<
        Ingredient> | null>, Array<Ingredient>>(
          `${MENU_STATE_NAME}/${MenuDispatcherName.GET_INGREDIENTS}`,
          async () => {
            // TODO: Fetch Ingredients from the database
            const IngredientListTemp: Array<Ingredient> = [
              {name: 'Butter', inventory: 2, unit: 'Tbsp', price: 5.00},
              {name: 'Ham', inventory: 2, unit: 'Tbsp', price: 5.00},
              {name: 'Water', inventory: 2, unit: 'Tbsp', price: 5.00},
              {name: 'Noodles', inventory: 2, unit: 'Tbsp', price: 5.00},
              {name: 'Tomatoes', inventory: 2, unit: 'Tbsp', price: 5.00},
              {name: 'Milk', inventory: 2, unit: 'Oz', price: 3.00},
            ];
            // TODO: Send Ingredient to the database
            return IngredientListTemp;
          },
        ),
  [MenuDispatcherName.GET_MENU_ITEMS]: createAsyncThunk<MenuItemsActionReturn<Array<
        MenuItem> | null>, Array<MenuItem>>(
          `${MENU_STATE_NAME}/${MenuDispatcherName.GET_MENU_ITEMS}`,
          async () => {
            // TODO: Fetch Ingredients from the database
            const MenuListTemp: Array<MenuItem> =[
              {name: 'Chicken', description: 'chicken', price: 5},
              {name: 'Rice', description: 'Rice', price: 3},
              {name: 'Steak', description: 'steak', price: 4},
              {name: 'Fries', description: 'Fries', price: 5},
              {name: 'Bread', description: 'Toasted', price: 4.39},
            ];
            // TODO: Send Ingredient to the database
            return MenuListTemp;
          },
        ),
  [MenuDispatcherName.GET_MENU_INGREDIENTS]: createAsyncThunk<MenuIngredientsActionReturn<Array<
        MenuIngredient> | null>, Array<MenuIngredient>>(
          `${MENU_STATE_NAME}/${MenuDispatcherName.GET_MENU_INGREDIENTS}`,
          async () => {
            // TODO: Fetch Ingredients from the database
            const butter:MenuIngredient = {
              name: 'Butter',
              measurement: 'Tbsp',
              amount: 5,
              menuItem: 'Chicken',
            };

            const ham:MenuIngredient = {
              name: 'Ham',
              measurement: 'Tbsp',
              amount: 4,
              menuItem: 'Chicken',
            };

            const water:MenuIngredient = {
              name: 'Water',
              measurement: 'oz',
              amount: 3,
              menuItem: 'Chicken',
            };

            const steak:MenuIngredient = {
              name: 'Water',
              measurement: 'oz',
              amount: 3,
              menuItem: 'Steak',
            };

            const MenuIngredientList: Array<MenuIngredient> = [
              butter,
              ham,
              water,
              steak,
            ];
            // TODO: Send Ingredient to the database
            return MenuIngredientList;
          },
        ),


};
