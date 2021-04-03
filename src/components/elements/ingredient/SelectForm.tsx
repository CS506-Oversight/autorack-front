import React, {} from 'react';

import {Button} from '@material-ui/core';
import Select from 'react-select';


type FirstChoice = {
  value: string,
  label: string,
    step: number,
}

const options: Array<FirstChoice> = [
  {value: 'Menu', label: 'Create Menu Item', step: 2},
  {value: 'Ingredient', label: 'Create Ingredient', step: 3},
  {value: 'Edit Menu Item', label: 'Edit Menu Item', step: 4},
  {value: 'Edit Ingredient Item', label: 'Edit Ingredient Item', step: 8},
];

type SelectFormProps = {
  nextStep: (step:number) => void,
  selection: FirstChoice,
  handleSelect: (selection: FirstChoice | null) => void,
}


export const SelectForm = (props: React.PropsWithChildren<SelectFormProps>) => {
  const {nextStep, selection, handleSelect} = props;


  const setStep = () => {
    nextStep(selection.step);
  };

  return (

    <React.Fragment>
      <h3>Select an Option</h3>
      <Select
        value={selection}
        onChange={(option) => handleSelect(option)}
        options={options}
      />
      <Button
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={setStep}>
              Continue
      </Button>
    </React.Fragment>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
