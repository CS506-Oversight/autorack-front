import React, {} from 'react';
import Select from 'react-select';
import {Button} from '@material-ui/core';


type FirstChoice = {
  value: string,
  label: string,
    step: number,
}

const options: Array<FirstChoice> = [
  {value: 'Menu', label: 'Create Menu Item', step: 2},
  {value: 'Ingredient', label: 'Create Ingredient', step: 3},
  {value: 'Edit', label: 'Edit Something?', step: 1},
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
