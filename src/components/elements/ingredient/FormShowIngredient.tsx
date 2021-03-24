import React, {} from 'react';
import Select from 'react-select';
import {Button, Paper} from '@material-ui/core';


type IngredientChoice = {
    value: string,
    label: string,
}

/**
 TODO figure out how to generalize these inputs
 make a for loop for all of the value,label pairs
 and create new pages for them
 */
/* const options: Array<MenuChoice> = [
  {value: 'Chicken', label: 'Chicken', step: 1},
  {value: 'Rice', label: 'Rice', step: 2},
  {value: 'Steak', label: 'Steak', step: 3},
  {value: 'Fries', label: 'Fries', step: 4},
];*/

/* const MenuList: Array<MenuItem> =[
  {name: 'Chicken', description: 'chicken', price: 5},
  {name: 'Rice', description: 'Rice', price: 3},
  {name: 'Steak', description: 'steak', price: 4},
  {name: 'Fries', description: 'Fries', price: 5},
];*/

const IngredientList: Array<Ingredient> = [
  {name: 'Butter', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Ham', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Water', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Noodles', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Tomatoes', inventory: 2, unit: 'Tbsp', price: 5.00},
];

type FormShowIngredientProps = {
    nextStep: (step:number) => void,
    forStep:number,
    backStep:number,
    selectMenu: IngredientChoice,
    handleShowIngredientItem: (selectIngredient: IngredientChoice | null) => void,
}

type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}
const options: Array<IngredientChoice> = [];

export const FormShowIngredient = (props: React.PropsWithChildren<FormShowIngredientProps>) => {
  const {nextStep, forStep, backStep, selectMenu, handleShowIngredientItem} = props;


  const setStep = () => {
    nextStep(forStep);
  };

  const makeOptionsArray = () => {
    while (options.length != 0) {
      options.pop();
    }
    // might mess up if menuList is updated from database
    for (const item of IngredientList) {
      const option: IngredientChoice = {
        value: item.name,
        label: item.name,
      };
      options.push(option);
    }
  };

  makeOptionsArray();

  return (

    <Paper elevation={3}>
      <React.Fragment>
        <h3>Select a Menu Item</h3>
        <Select
          value={selectMenu}
          onChange={(option) => handleShowIngredientItem(option)}
          options={options}
        />
        <Button
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={setStep}>
                    Continue
        </Button>
        <Button
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={function() {
            nextStep(backStep);
          }}>
                    Back
        </Button>
      </React.Fragment>
    </Paper>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
