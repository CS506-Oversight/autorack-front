import {Ingredient, newIngredientId} from '../../../state/ingredient/data';
import {dummyIngredientData} from './data';

const generateRandomString = () => Math.random().toString(36).substring(2, 5);

export const mockUpsertIngredients = async (
  original: Array<Ingredient>,
  upsert: Array<Ingredient>,
): Promise<Array<Ingredient>> => {
  // Create upsert map
  const update = Object.fromEntries(upsert
    .filter((ingredient) => ingredient.id !== newIngredientId)
    .map((ingredient) => [ingredient.id, ingredient]));

  // Update all in `original`
  original = original.map((ingredient) => {
    const updatedIngredient = update[ingredient.id];

    // Not updated
    if (!updatedIngredient) {
      return ingredient;
    }

    return update[ingredient.id];
  });

  // Add all new ingredients
  const newIngredients = upsert
    .filter((ingredient) => ingredient.id === newIngredientId)
    .map((ingredient) => ({...ingredient, id: generateRandomString()}));

  // FIXME: Should send `original` and `upsert` to the backend, modify the original data,
  //  then return all of it back instead.

  return original.concat(newIngredients);
};

export const mockFetchIngredient = async (): Promise<Array<Ingredient>> => {
  // Fetch (generate) ingredients
  return dummyIngredientData;
};
