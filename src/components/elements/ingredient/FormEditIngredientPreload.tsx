import React, {ChangeEvent} from 'react';

import {FormControl, InputAdornment, FilledInput, TextField, InputLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import UIButton from '../ui/Button';

// define styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '10ch',
  },
}));

// define types
type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}


type FormEditIngredientPreloadProps = {
    nextStep: (step: number) => void,
    forStep: number,
    backStep: number,
    handleIngredient: (item: Ingredient) => void,
    ingredientItemFromSelect: Ingredient,
}


export const FormEditIngredientPreload = (props: React.PropsWithChildren<FormEditIngredientPreloadProps>) => {
  const {nextStep, forStep, backStep, handleIngredient, ingredientItemFromSelect} = props;
  const classes = useStyles();

  // local state of ingredient being edited
  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>(ingredientItemFromSelect);

  // updates state of local ingredient and its parent in EditMenu.tsx
  const updateIngredientItem = (key: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientItem({...ingredientItem, [key]: e.target.value});
    handleIngredient(ingredientItem);
  };

  // updates the number fields of local ingredient and it's parent in EditMenu.tsx
  const updateIngredientNum = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIngredientItem({...ingredientItem, [key]: +e.target.value});
    handleIngredient(ingredientItem);
  };

  // Handles continue, checks if forms are filled correctly
  const handleContinueClick = () => {
    if (ingredientItem.name === '') {
      alert('Please fill in name field');
    } else if (isNaN(ingredientItem.inventory)) {
      alert('The inventory amount must be a number');
    } else if (ingredientItem.unit === '') {
      alert('Please fill in unit field');
    } else if (isNaN(ingredientItem.price)) {
      alert('The price must be a number');
    } else {
      nextStep(forStep);
      handleIngredient(ingredientItem);
    }
  };

  return (
    <>
      <FormControl fullWidth={false} className={classes.margin} variant="filled">
        <h3>Fill in Ingredient Item Things and change this line</h3>
        <TextField
          id="Name"
          label="Name"
          value = {ingredientItem.name}
          defaultValue={ingredientItem.name}
          variant="filled"
        />
        <br/>
        <TextField
          id="Unit"
          label="Unit of Measurement for Ingredient"
          onChange={updateIngredientItem('unit')}
          defaultValue={ingredientItem.unit}
          variant="filled"
        />
        <br/>
        <FormControl fullWidth = {false} className={classes.margin} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">
                        Inventory - Current Available Units of Ingredient
          </InputLabel>
          <FilledInput
            type = 'number'
            onChange={updateIngredientNum('inventory')}
            defaultValue={ingredientItem.inventory}
            id="filled-adornment-password"
          />
        </FormControl>
        <br/>
        <FormControl fullWidth = {false} className={classes.margin} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">
                        Price - Price to buy One Unit Worth of Inventory
          </InputLabel>
          <FilledInput
            type = 'number'
            onChange={updateIngredientNum('price')}
            defaultValue={ingredientItem.price}
            id="filled-adornment-password"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <UIButton
          text = 'Continue'
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={handleContinueClick}>
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
      </FormControl>
    </>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
