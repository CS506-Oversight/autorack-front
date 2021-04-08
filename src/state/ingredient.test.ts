import {IngredientData, VolumeMeasure, volumeMeasureData} from './ingredient/data';
import {ingredientDispatchers} from './ingredient/dispatchers';
import ingredientReducer from './ingredient/reducer';

describe('ingredient reducer behavior', () => {
  const ingredient: IngredientData = {
    id: 'aaa',
    name: 'test',
    measurement: volumeMeasureData[VolumeMeasure.FL_OZ],
    unit: 1,
    unitPrice: 7,
  };

  it('adds a new ingredient', () => {
    const action = {
      type: ingredientDispatchers.addIngredient.fulfilled,
      payload: ingredient,
    };

    const newState = ingredientReducer(undefined, action);
    const result = newState
      .ingredients
      .some((ingredient) => ingredient.name === ingredient.name);
    expect(result).toBeTruthy();
  });

  it('removes an ingredient', () => {
    const action = {
      type: ingredientDispatchers.removeIngredient.fulfilled,
      payload: ingredient.id,
    };

    const newState = ingredientReducer({ingredients: [ingredient]}, action);
    const result = newState
      .ingredients
      .some((ingredient) => ingredient.name === ingredient.name);
    expect(result).toBeFalsy();
  });

  it('updates an ingredient', () => {
    const action = {
      type: ingredientDispatchers.updateIngredient.fulfilled,
      payload: {...ingredient, unitPrice: 90},
    };

    const newState = ingredientReducer({ingredients: [ingredient]}, action);
    const result = newState
      .ingredients
      .some((ingredient) => ingredient.unitPrice === 90);
    expect(result).toBeTruthy();
  });
});
