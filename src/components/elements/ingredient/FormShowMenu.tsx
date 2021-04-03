import React, {} from 'react';
import Select from 'react-select';
import {Button, Paper} from '@material-ui/core';


type MenuChoice = {
  value: string,
  label: string,
  step: number,
}

/**
 TODO figure out how to generalize these inputs
 make a for loop for all of the value,label pairs
 and create new pages for them
*/


type SelectFormProps = {
  nextStep: (step:number) => void,
  forStep:number,
  backStep:number,
  selectMenu: MenuChoice,
  handleShowMenuItem: (selectMenu: MenuChoice | null) => void,
  MenuList: Array<MenuItem>,

}

type MenuItem = {
  name: string,
  description: string,
  price: number,
}
const options: Array<MenuChoice> = [];

export const FormShowMenu = (props: React.PropsWithChildren<SelectFormProps>) => {
  const {nextStep, forStep, backStep, selectMenu, handleShowMenuItem, MenuList} = props;

  const setStep = () => {
    if (selectMenu.value === '') {

    } else {
      nextStep(forStep);
    }
  };

  const makeOptionsArray = () => {
    while (options.length != 0) {
      options.pop();
    }

    for (const item of MenuList) {
      const option: MenuChoice = {
        value: item.name,
        label: item.name,
        step: 5,
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
          onChange={(option) => handleShowMenuItem(option)}
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
