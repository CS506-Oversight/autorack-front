import React, {} from 'react';

import Select from 'react-select';

import UIButton from '../ui/Button';

// Define type
type FirstChoice = {
  value: string,
  label: string,
    step: number,
}
// Array of initial choices --  doesn't need to be in database this can stay hard-coded
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

  // function for setting next step
  const setStep = () => {
    nextStep(selection.step);
  };

  return (
    <>
      <h3>Select an Option</h3>
      <Select
        classNamePrefix='firstSelect'
        value={selection}
        onChange={(option) => handleSelect(option)}
        options={options}
      />
      <UIButton
        text = 'Continue'
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={setStep}>
      </UIButton>
    </>
  );
};

const styles = {
  button: {
    margin: 15,
  },
};
