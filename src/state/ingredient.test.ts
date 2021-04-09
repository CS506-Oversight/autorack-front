import {Ingredient, VolumeMeasure, volumeMeasureData} from './ingredient/data';
import {ingredientDispatchers} from './ingredient/dispatchers';
import ingredientReducer from './ingredient/reducer';

describe('ingredient reducer behavior', () => {
  const ingredient: Ingredient = {
    id: 'aaa',
    name: 'test',
    measure: volumeMeasureData[VolumeMeasure.FL_OZ],
    unit: 1,
    unitPrice: 7,
  };

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
      payload: [{...ingredient, unitPrice: 90}],
    };

    const newState = ingredientReducer({ingredients: [ingredient], lastFetch: 0}, action);
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.unitPrice === 90),
    )
      .toBeTruthy();
    expect(newState.ingredients.length).toBe(1);
  });

  it('adds 3 and updates 1 ingredient', () => {
    const action = {
      type: ingredientDispatchers.upsertIngredient.fulfilled,
      payload: [
        {...ingredient, id: 'bbb'},
        {...ingredient, id: 'ccc'},
        {...ingredient, id: 'ddd'},
        {...ingredient, unitPrice: 90},
      ],
    };

    const newState = ingredientReducer({ingredients: [ingredient], lastFetch: 0}, action);
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.unitPrice === 90),
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

  it('updates 3 and adds 1 ingredient', () => {
    const action = {
      type: ingredientDispatchers.upsertIngredient.fulfilled,
      payload: [
        {...ingredient, id: 'eee'},
        {...ingredient, id: 'bbb', unitPrice: 90},
        {...ingredient, id: 'ccc', unitPrice: 900},
        {...ingredient, id: 'ddd', unitPrice: 9000},
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
        .some((ingredient) => ingredient.id === 'bbb' && ingredient.unitPrice === 90),
    )
      .toBeTruthy();
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.id === 'ccc' && ingredient.unitPrice === 900),
    )
      .toBeTruthy();
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.id === 'ddd' && ingredient.unitPrice === 9000),
    )
      .toBeTruthy();
    expect(newState.ingredients.length).toBe(4);
  });

  it('removes an ingredient', () => {
    const action = {
      type: ingredientDispatchers.removeIngredient.fulfilled,
      payload: ingredient.id,
    };

    const newState = ingredientReducer({ingredients: [ingredient], lastFetch: 0}, action);
    expect(
      newState
        .ingredients
        .some((ingredient) => ingredient.name === ingredient.name),
    )
      .toBeFalsy();
    expect(newState.ingredients.length).toBe(0);
  });
});
