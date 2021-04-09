import React from 'react';

import {Ingredient} from '../../../state/ingredient/data';
import {AccordionList} from '../item/AccordionList';
import {IngredientForm} from './Form';

export type IngredientListProps = {
  ingredients: Array<Ingredient>,
  setIngredients: (newIngredientData: Ingredient, index: number) => void,
  onDelete: (index: number) => () => void,
  onSubmit?: () => void,
}

export const IngredientList = ({ingredients, setIngredients, onDelete, onSubmit}: IngredientListProps) => {
  return (
    <AccordionList
      items={ingredients}
      setItemByIndex={setIngredients}
      onDelete={onDelete}
      onSubmit={onSubmit}
      isItemIncomplete={(ingredient) => !ingredient.name || !ingredient.unit || !ingredient.unitPrice}
      getAccordionTitle={(ingredient) => ingredient.name || '(no name)'}
      renderItemForm={(ingredient, setIngredient) => (
        <IngredientForm
          ingredient={ingredient}
          setIngredient={setIngredient}
        />
      )}
    />
  );
};
