import {Ingredient, newIngredientId} from '../../../state/ingredient/data';
import {mockUpsertItems} from '../base/upsert';
import {dummyIngredientData} from './data';

export const mockUpsertIngredients = async (
  original: Array<Ingredient>,
  upsert: Array<Ingredient>,
): Promise<Array<Ingredient>> => {
  return mockUpsertItems(
    original,
    upsert,
    (ingredient) => ingredient.id,
    newIngredientId,
  );
};

export const mockFetchIngredient = async (): Promise<Array<Ingredient>> => {
  // Fetch (generate) ingredients
  return dummyIngredientData;
};
