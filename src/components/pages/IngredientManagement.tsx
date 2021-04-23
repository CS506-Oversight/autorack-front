import React from 'react';

import {defaultMeasure, Ingredient, newIngredientId} from '../../state/ingredient/data';
import {ingredientDispatchers} from '../../state/ingredient/dispatchers';
import {useIngredientSelector} from '../../state/ingredient/selector';
import {IngredientList} from '../elements/ingredient/List';
import {ItemManagement} from './base/management/ItemManagement';

const sentinelNewIngredient: Ingredient = {
  id: newIngredientId,
  name: '',
  measure: defaultMeasure,
  unit: 0.0,
  capacity: 0.0,
};

export const IngredientManagement = () => {
  // Note that this state will not be refreshed on-rerender
  const ingredientState = useIngredientSelector();

  return (
    <ItemManagement
      newItemSentinel={sentinelNewIngredient}
      initialOptions={ingredientState.ingredients}
      initialState={ingredientState}
      loadDispatcher={ingredientDispatchers.loadIngredient}
      upsertDispatcher={ingredientDispatchers.upsertIngredient}
      getInitialStateItems={(state) => state.ingredients}
      messageOnSuccess="Ingredient Updated/Added."
      selectLabel="Ingredient to Add/Edit"
      renderItemList={(managementState, setItemByIndex, onDelete, onSubmit) => (
        <IngredientList
          ingredients={managementState.onForm}
          setIngredients={setItemByIndex}
          onSubmit={onSubmit}
          onDelete={onDelete}
          isAddAllowed
        />
      )}
    />
  );
};
