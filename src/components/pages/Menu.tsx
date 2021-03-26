import React from 'react';
import {SelectForm} from '../elements/ingredient/SelectForm';
import {FormIngredient} from '../elements/ingredient/FormIngredient';
import {Paper} from '@material-ui/core';
import {FormMenuAndIngredients} from '../elements/ingredient/FormMenuAndIngredients';
import {FormShowMenu} from '../elements/ingredient/FormShowMenu';
/* import {FormEditMenuItemPreload} from '../elements/ingredient/FormEditMenuItemPreload';*/
import {FormShowIngredient} from '../elements/ingredient/FormShowIngredient';
import {FormEditIngredientPreload} from '../elements/ingredient/FormEditIngredientPreload';
import {FormConfirmationMenu} from '../elements/ingredient/FormConfirmationMenu';
import {FormConfirmationIngredient} from '../elements/ingredient/FormConfirmationIngredient';


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


const butter:MenuIngredient = {
  name: 'Butter',
  measurement: 'Tbsp',
  amount: 5,
  menuItem: 'Chicken',
};

const ham:MenuIngredient = {
  name: 'Ham',
  measurement: 'Tbsp',
  amount: 4,
  menuItem: 'Chicken',
};

const water:MenuIngredient = {
  name: 'Water',
  measurement: 'oz',
  amount: 3,
  menuItem: 'Chicken',
};

const steak:MenuIngredient = {
  name: 'Water',
  measurement: 'oz',
  amount: 3,
  menuItem: 'Steak',
};

const MenuIngredientList: Array<MenuIngredient> = [
  butter,
  ham,
  water,
  steak,
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

  const [menuIngredientArray, setMenuIngredientArray] = React.useState<Array<MenuIngredient>>(MenuIngredientList);

  const [selected, setSelected] = React.useState<FirstChoice>({
    value: '',
    label: 'Select Option',
    step: progress.step,
  });
  const [menuItem, setMenuItem] = React.useState<MenuItem>({
    name: '',
    description: '',
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
    step: 4,
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
    /*    console.log('here1');*/
    await setMenuIngredientArray(placeArray);
  };

  const handleMenuItem = async (item: MenuItem): Promise<void> => {
    await setMenuItem(item);
    /*    console.log(menuItem);*/
  };

  const handleIngredient = (item: Ingredient) => {
    setIngredientItem(item);
  };


  const handleShowMenuItem = async (menuOption: MenuChoice | null): Promise<void> => {
    if (!menuOption) {
      return;
    }
    await setShowMenuItem(menuOption);
    console.log('here');
    /*    console.log(menuOption);*/

    for (const listThing of MenuList) {
      if (menuOption.value === listThing.name) {
        await setMenuItem(listThing);
        /*        console.log(listThing);
        console.log(menuItem);*/
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


  /*  console.log(menuItem);*/
  const selectMenu = showMenuItem;
  const selectIngredient = showIngredientItem;

  const handleSelect = (selectedOption: FirstChoice | null) => {
    if (!selectedOption) {
      return;
    }
    setSelected(selectedOption);

    if (selectedOption.value === 'Menu') {
      // set all states to normal
      const defaultMenuItem : MenuItem = {
        name: '',
        description: '',
        price: 0,
      };
      handleMenuItem(defaultMenuItem);
    } else if (selectedOption.value === 'Ingredient') {
      const defaultIngredientItem : Ingredient = {
        name: '',
        inventory: 0,
        unit: '',
        price: 0,
      };
      handleIngredient(defaultIngredientItem);
    } else if (selectedOption.value === 'Edit Menu Item') {
      const defaultShowMenu : MenuChoice = {
        value: '',
        label: 'Select a Menu Item',
        step: 4,
      };
      handleShowMenuItem(defaultShowMenu);
    } else if (selectedOption.value === 'Edit Ingredient Item') {
      const defaultShowIngredient : IngredientChoice = {
        value: '',
        label: 'Select an Ingredient',
      };
      handleShowIngredientItem(defaultShowIngredient);
    }
  };


  const step = progress.step;
  const selection = selected;
  /*  console.log('here');
  console.log(menuIngredientArray);*/
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
        newIng={6}
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
          forStep = {13}
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
      <FormMenuAndIngredients
        nextStep={nextStep}
        forStep = {11}
        backStep = {4}
        newIng={7}
        handleMenuItem={handleMenuItem}
        menuItemFromSelect={menuItem}
        handleMenuIngredientRelation = {handleMenuIngredientRelation}
        menuIngredientArrayFromMenu={menuIngredientArray}
      />

    /*      <FormEditMenuItemPreload
        nextStep={nextStep}
        forStep = {11}
        backStep = {4}
        handleMenuItem={handleMenuItem}
        menuItemFromSelect={menuItem}
      />*/

    );
  case 6:
    return (
      <Paper elevation={3}>
        <FormIngredient
          nextStep={nextStep}
          forStep = {12}
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
          forStep = {14}
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
        selectIngredient= {selectIngredient}
        handleShowIngredientItem={handleShowIngredientItem}
      />
    );

  case 9:
    return (
      <Paper elevation={3}>
        <FormEditIngredientPreload
          nextStep={nextStep}
          forStep = {15}
          backStep = {8}
          handleIngredient={handleIngredient}
          ingredientItemFromSelect={ingredientItem}
        />
      </Paper>
    );

  case 10:
    return (
      <FormConfirmationMenu
        nextStep={nextStep}
        forStep={1}
        backStep={2}
      />
    );
  case 11:
    return (
      <FormConfirmationMenu
        nextStep={nextStep}
        forStep={1}
        backStep={5}
      />
    );
    // done
  case 12:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={2}
        backStep = {6}
      />
    );
    // done
  case 13:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={1}
        backStep = {3}
      />
    );
    // done
  case 14:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={5}
        backStep = {7}
      />
    );
    // done
  case 15:
    return (
      <FormConfirmationIngredient
        nextStep={nextStep}
        forStep={1}
        backStep = {9}
      />
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
