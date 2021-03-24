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
/* const options: Array<MenuChoice> = [
  {value: 'Chicken', label: 'Chicken', step: 1},
  {value: 'Rice', label: 'Rice', step: 2},
  {value: 'Steak', label: 'Steak', step: 3},
  {value: 'Fries', label: 'Fries', step: 4},
];*/

const MenuList: Array<MenuItem> =[
  {name: 'Chicken', description: 'chicken', price: 5},
  {name: 'Rice', description: 'Rice', price: 3},
  {name: 'Steak', description: 'steak', price: 4},
  {name: 'Fries', description: 'Fries', price: 5},
];

type SelectFormProps = {
  nextStep: (step:number) => void,
  forStep:number,
  backStep:number,
  selectMenu: MenuChoice,
  handleShowMenuItem: (selectMenu: MenuChoice | null) => void,
}

type MenuItem = {
  name: string,
  description: string,
  /*  imageURl: string,*/
  price: number,
}
const options: Array<MenuChoice> = [];

export const FormShowMenu = (props: React.PropsWithChildren<SelectFormProps>) => {
  const {nextStep, forStep, backStep, selectMenu, handleShowMenuItem} = props;


  const setStep = () => {
    nextStep(forStep);
  };

  const makeOptionsArray = () => {
    while (options.length != 0) {
      options.pop();
    }
    // might mess up if menuList is updated from database
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
