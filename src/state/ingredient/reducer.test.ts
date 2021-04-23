import {dummyIngredientData} from '../../api/mock/ingredient/data';
import {Ingredient, VolumeMeasure, volumeMeasureData} from './data';
import {ingredientDispatchers} from './dispatchers';
import ingredientReducer from './reducer';

describe('ingredient reducer behavior', () => {
  const ingredient: Ingredient = {
    id: 'aaa',
    name: 'test',
    measure: volumeMeasureData[VolumeMeasure.FL_OZ],
    currentStock: 1,
    capacity: 70.0,
  };

  it('loads dummy ingredients', () => {
    const action = {
      type: ingredientDispatchers.loadIngredient.fulfilled,
      payload: dummyIngredientData,
    };

    const newState = ingredientReducer({ingredients: [], lastFetch: 0}, action);
    expect(newState.ingredients.length).toBe(3);
    expect(newState.ingredients).toBe(dummyIngredientData);
  });

  it('adds a new ingredient', () => {
    const action = {
      type: ingredientDispatchers.upsertIngredient.fulfilled,
      payload: [ingredient],
    };

    const newState = ingredientReducer({ingredients: [], lastFetch: 0}, action);
    expect(newState.ingredients.length).toBe(1);
  });

  it('updates an ingredient', () => {
    const action = {
      type: ingredientDispatchers.upsertIngredient.fulfilled,
      payload: [{...ingredient, name: 'fff'}],
    };

    const newState = ingredientReducer({ingredients: [ingredient], lastFetch: 0}, action);
    expect(newState.ingredients.some((ingredient) => ingredient.name === 'fff')).toBeTruthy();
    expect(newState.ingredients.length).toBe(1);
  });

  it('adds 3 and updates 1 ingredient', () => {
    const action = {
      type: ingredientDispatchers.upsertIngredient.fulfilled,
      payload: [
        {...ingredient, id: 'bbb'},
        {...ingredient, id: 'ccc'},
        {...ingredient, id: 'ddd'},
        {...ingredient, name: 'fff'},
      ],
    };

    const newState = ingredientReducer({ingredients: [ingredient], lastFetch: 0}, action);
    expect(newState.ingredients.some((ingredient) => ingredient.name === 'fff')).toBeTruthy();
    expect(newState.ingredients.some((ingredient) => ingredient.id === 'bbb')).toBeTruthy();
    expect(newState.ingredients.some((ingredient) => ingredient.id === 'ccc')).toBeTruthy();
    expect(newState.ingredients.some((ingredient) => ingredient.id === 'ddd')).toBeTruthy();
    expect(newState.ingredients.length).toBe(4);
  });

  it('updates 3 and adds 1 ingredient', () => {
    const action = {
      type: ingredientDispatchers.upsertIngredient.fulfilled,
      payload: [
        {...ingredient, id: 'eee'},
        {...ingredient, id: 'bbb'},
        {...ingredient, id: 'ccc'},
        {...ingredient, id: 'ddd'},
      ],
    };

    const newState = ingredientReducer({
      ingredients: [
        {...ingredient, id: 'bbb'},
        {...ingredient, id: 'ccc'},
        {...ingredient, id: 'ddd'},
      ],
      lastFetch: 0,
    }, action);
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.id === 'eee'),
    )
      .toBeTruthy();
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.id === 'bbb'),
    )
      .toBeTruthy();
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.id === 'ccc'),
    )
      .toBeTruthy();
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.id === 'ddd'),
    )
      .toBeTruthy();
    expect(newState.ingredients.length).toBe(4);
  });
});
