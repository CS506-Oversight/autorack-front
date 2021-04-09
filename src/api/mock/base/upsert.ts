const generateRandomString = () => Math.random().toString(36).substring(2, 5);

export const mockUpsertItems = async <T, K>(
  original: Array<T>,
  upsert: Array<T>,
  getCompareKey: (obj: T) => K,
  newKey: K,
): Promise<Array<T>> => {
  // Create upsert map
  const update = Object.fromEntries(upsert
    .filter((ingredient) => getCompareKey(ingredient) !== newKey)
    .map((ingredient) => [getCompareKey(ingredient), ingredient]));

  // Update all in `original`
  original = original.map((ingredient) => {
    const updatedIngredient = update[getCompareKey(ingredient)];

    // Not updated
    if (!updatedIngredient) {
      return ingredient;
    }

    return update[getCompareKey(ingredient)];
  });

  // Add all new ingredients
  const newIngredients = upsert
    .filter((ingredient) => getCompareKey(ingredient) === newKey)
    .map((ingredient) => ({...ingredient, id: generateRandomString()}));

  // FIXME: Should send `original` and `upsert` to the backend, modify the original data,
  //  then return all of it back instead.

  return original.concat(newIngredients);
};
