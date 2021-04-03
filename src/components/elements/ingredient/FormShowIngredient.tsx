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


  const setStep = () => {
    if (selectIngredient.value === '') {

    } else {
      nextStep(forStep);
    }
  };

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

  makeOptionsArray();

  return (

    <Paper elevation={3}>
      <React.Fragment>
        <h3>Select a Menu Item</h3>
        <Select
          value={selectIngredient}
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
