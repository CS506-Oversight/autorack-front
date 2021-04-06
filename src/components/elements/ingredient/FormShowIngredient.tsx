import React, {} from 'react';

import {Paper} from '@material-ui/core';
import Select from 'react-select';

import UIButton from '../ui/Button';

// declare types
type IngredientChoice = {
    value: string,
    label: string,
}

type FormShowIngredientProps = {
    nextStep: (step:number) => void,
    forStep:number,
    backStep:number,
    selectIngredient: IngredientChoice,
    handleShowIngredientItem: (selectIngredient: IngredientChoice | null) => void,
    IngredientList: Array<Ingredient>,
}

type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}
const options: Array<IngredientChoice> = [];

export const FormShowIngredient = (props: React.PropsWithChildren<FormShowIngredientProps>) => {
  const {nextStep, forStep, backStep, selectIngredient, handleShowIngredientItem,
    IngredientList} = props;

  // Set next step
  const setStep = () => {
    if (selectIngredient.value === '') {

    } else {
      nextStep(forStep);
    }
  };

  // function to make selectable ingredients in Select
  const makeOptionsArray = () => {
    while (options.length != 0) {
      options.pop();
    }

    for (const item of IngredientList) {
      const option: IngredientChoice = {
        value: item.name,
        label: item.name,
      };
      options.push(option);
    }
  };

  // initialize array on page load
  makeOptionsArray();

  return (
    <Paper elevation={3}>
      <>
        <h3>Select a Menu Item</h3>
        <Select
          value={selectIngredient}
          onChange={(option) => handleShowIngredientItem(option)}
          options={options}
        />
        <UIButton
          text = 'Continue'
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={setStep}>
        </UIButton>
        <UIButton
          text = 'Back'
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={function() {
            nextStep(backStep);
          }}>
        </UIButton>
      </>
    </Paper>
  );
};

const styles = {
  button: {
    margin: 15,
  },
};
