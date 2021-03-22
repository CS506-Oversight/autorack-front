import React from 'react';
import {SelectForm} from '../elements/ingredient/SelectForm';
import {FormMenuItem} from '../elements/ingredient/FormMenuItem';
import {FormIngredient} from '../elements/ingredient/FormIngredient';


export type Progress = {
  step: number
  lastStep: number
};

type FirstChoice = {
  value: string,
  label: string,
  step: number,
}

type MenuItem = {
  name: string,
  description: string,
  imageURl: string,
  price: number,
}

type Ingredient = {
  name: string,
  inventory: number,
  unit: string,
  price: number,
}


export const Menu = () => {
  const [progress, setProgress] = React.useState({
    step: 1,
    lastStep: 1,
  });

  const [selected, setSelected] = React.useState<FirstChoice>({
    value: '',
    label: 'Select Option',
    step: progress.step,
  });
  const [menuItem, setMenuItem] = React.useState<MenuItem>({
    name: '',
    description: '',
    imageURl: '',
    price: 0,
  });

  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>({
    name: '',
    inventory: 0,
    unit: '',
    price: 0,
  });

  const nextStep = (step: number) => {
    setProgress({
      step: step,
      lastStep: progress.step,
    });
  };

  const prevStep = () => {
    setProgress({
      step: progress.lastStep,
      lastStep: 1,
    });
  };
  const handleMenuItem = (item: MenuItem) => {
    setMenuItem(item);
  };

  const handleIngredient = (item: Ingredient) => {
    setIngredientItem(item);
  };

  const handleSelect = (selectedOption: FirstChoice | null) => {
    if (!selectedOption) {
      return;
    }
    setSelected(selectedOption);
  };
  const step = progress.step;
  const selection = selected;


  switch (step) {
  case 1:
    return (
      <SelectForm
        nextStep={nextStep}
        handleSelect={handleSelect}
        selection = {selection}
      />
    );
  case 2:
    return (
      <FormMenuItem
        nextStep={nextStep}
        prevStep={prevStep}
        handleMenuItem={handleMenuItem}
      />
    );
  case 3:
    return (
      <FormIngredient
        nextStep={nextStep}
        prevStep={prevStep}
        handleIngredient={handleIngredient}
      />
    );
  default:
    return (
      <div>
        {menuItem.price}
        {ingredientItem.price}
      </div>
    );
  }
};
