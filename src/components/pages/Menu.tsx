import React from 'react';
import {SelectForm} from '../elements/ingredient/SelectForm';
/* import {FormMenuItem} from '../elements/ingredient/FormMenuItem';*/
import {FormIngredient} from '../elements/ingredient/FormIngredient';
/* import {FormAddIngredients} from '../elements/ingredient/FormAddIngredients';*/
import {Paper} from '@material-ui/core';
import {FormMenuAndIngredients} from '../elements/ingredient/FormMenuAndIngredients';
import {FormShowMenu} from '../elements/ingredient/FormShowMenu';
import {FormEditMenuItemPreload} from '../elements/ingredient/FormEditMenuItemPreload';
import {FormShowIngredient} from '../elements/ingredient/FormShowIngredient';
import {FormEditIngredientPreload} from '../elements/ingredient/FormEditIngredientPreload';

export type Progress = {
  step: number
  lastStep: number
};

const MenuList: Array<MenuItem> =[
  {name: 'Chicken', description: 'chicken', price: 5},
  {name: 'Rice', description: 'Rice', price: 3},
  {name: 'Steak', description: 'steak', price: 4},
  {name: 'Fries', description: 'Fries', price: 5},
];

const IngredientList: Array<Ingredient> = [
  {name: 'Butter', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Ham', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Water', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Noodles', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Tomatoes', inventory: 2, unit: 'Tbsp', price: 5.00},
];

type FirstChoice = {
  value: string,
  label: string,
  step: number,
}

type MenuChoice = {
  value: string,
  label: string,
  step: number,
}

type MenuItem = {
  name: string,
  description: string,
/*  imageURl: string,*/
  price: number,
}

type Ingredient = {
  name: string,
  inventory: number,
  unit: string,
  price: number,
}
type IngredientChoice = {
  value: string,
  label: string,
}

 type MenuIngredient = {
  name: string,
  measurement: string,
  amount: number,
  menuItem: string,
};


export const Menu = () => {
  const [progress, setProgress] = React.useState({
    step: 1,
  });

  const [menuIngredientArray, setMenuIngredientArray] = React.useState<Array<MenuIngredient>>([]);

  const [selected, setSelected] = React.useState<FirstChoice>({
    value: '',
    label: 'Select Option',
    step: progress.step,
  });
  const [menuItem, setMenuItem] = React.useState<MenuItem>({
    name: '',
    description: '',
    /*    imageURl: '',*/
    price: 0,
  });

  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>({
    name: '',
    inventory: 0,
    unit: '',
    price: 0,
  });

  const [showMenuItem, setShowMenuItem] = React.useState<MenuChoice>({
    value: '',
    label: 'Select a Menu Item',
    step: progress.step,
  });

  const [showIngredientItem, setShowIngredientItem] = React.useState<IngredientChoice>({
    value: '',
    label: 'Select an Ingredient',
  });

  const nextStep = (step: number) => {
    setProgress({
      step: step,
    });
  };

  const handleMenuIngredientRelation = async (placeArray:Array<MenuIngredient>): Promise<void> => {
    console.log('here1');
    await setMenuIngredientArray(placeArray);
  };

  const handleMenuItem = async (item: MenuItem): Promise<void> => {
    await setMenuItem(item);
    console.log(menuItem);
  };

  const handleIngredient = (item: Ingredient) => {
    setIngredientItem(item);
  };

  /*  const firstMenuItemSet = (itemName: String) => {
    console.log('here');
    for (const menuItem of MenuList) {
      if (itemName === menuItem.name) {
        console.log(menuItem);
        setMenuItem(menuItem);
      }
    }
  };*/

  const handleShowMenuItem = async (menuOption: MenuChoice | null): Promise<void> => {
    if (!menuOption) {
      return;
    }
    await setShowMenuItem(menuOption);
    /*    console.log(menuOption);*/

    for (const listThing of MenuList) {
      if (menuOption.value === listThing.name) {
        await setMenuItem(listThing);
        console.log(listThing);
        console.log(menuItem);
      }
    }
  };

  const handleShowIngredientItem = async (ingredientOption: IngredientChoice | null): Promise<void> => {
    if (!ingredientOption) {
      return;
    }
    await setShowIngredientItem(ingredientOption);

    for (const listThing of IngredientList) {
      if (ingredientOption.value === listThing.name) {
        await setIngredientItem(listThing);
      }
    }
  };

  console.log(menuItem);
  const selectMenu = showMenuItem;
  const selectIngredient = showIngredientItem;

  const handleSelect = (selectedOption: FirstChoice | null) => {
    if (!selectedOption) {
      return;
    }
    setSelected(selectedOption);
  };
  const step = progress.step;
  const selection = selected;
  console.log('here');
  console.log(menuIngredientArray);
  switch (step) {
  case 1:
    return (
      <Paper elevation={3}>
        <SelectForm
          nextStep={nextStep}
          handleSelect={handleSelect}
          selection = {selection}
        />
      </Paper>
    );
  case 2:
    return (
      <FormMenuAndIngredients
        nextStep={nextStep}
        forStep = {10}
        backStep = {1}
        handleMenuItem={handleMenuItem}
        menuItemFromSelect={menuItem}
        handleMenuIngredientRelation = {handleMenuIngredientRelation}
        menuIngredientArrayFromMenu={menuIngredientArray}
      />

    );
  case 3:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {10}
          backStep = {1}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  case 4:
    return (
      <FormShowMenu
        nextStep={nextStep}
        forStep = {5}
        backStep = {1}
        selectMenu = {selectMenu}
        handleShowMenuItem={handleShowMenuItem}
      />
    );
  case 5:
    return (
      <FormEditMenuItemPreload
        nextStep={nextStep}
        forStep = {10}
        backStep = {4}
        handleMenuItem={handleMenuItem}
        menuItemFromSelect={menuItem}
      />

    );
  case 6:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {2}
          backStep = {2}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  case 7:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {5}
          backStep = {5}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  case 8:
    return (
      <FormShowIngredient
        nextStep={nextStep}
        forStep = {9}
        backStep = {1}
        selectMenu = {selectIngredient}
        handleShowIngredientItem={handleShowIngredientItem}
      />
    );

  case 9:
    return (
      <Paper elevation={3}>
        <FormEditIngredientPreload
          nextStep={nextStep}
          forStep = {10}
          backStep = {8}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>

    );
  default:
    return (
      <div>
      </div>
    );
  }
};

/* const styles = {
  button: {
    margin: 15,
  },
};*/
