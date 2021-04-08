import {Ingredient, IngredientData} from '../../../state/ingredient/data';

export const mockAddIngredient = async (ingredient: Ingredient): Promise<IngredientData> => {
  // Generate a random string as ID
  return {
    ...ingredient,
    // https://stackoverflow.com/a/8084248/11571888
    id: Math.random().toString(36).substring(2, 5),
  };
};
