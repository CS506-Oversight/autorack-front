import React from 'react';

import {Ingredient} from '../../../state/ingredient/data';
import {AccordionList} from '../item/AccordionList';
import {IngredientForm} from './Form';

export type IngredientListProps = {
  ingredients: Array<Ingredient>,
  setIngredients: (newIngredientData: Ingredient, index: number) => void,
  onSubmit: () => void,
  onDelete: (index: number) => () => void,
}

export const IngredientList = ({ingredients, setIngredients, onSubmit, onDelete}: IngredientListProps) => {
  return (
    <AccordionList
      items={ingredients}
      setItemByIndex={setIngredients}
      onSubmit={onSubmit}
      onDelete={onDelete}
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
