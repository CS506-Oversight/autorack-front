import React, {ChangeEvent} from 'react';

/* import Select from 'react-select';*/
import {Button, FormControl, InputAdornment, FilledInput, TextField, InputLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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


type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}


type FormEditIngredientPreloadProps = {
    nextStep: (step:number) => void,
    forStep:number,
    backStep:number,
    handleIngredient: (item: Ingredient) => void,
    ingredientItemFromSelect: Ingredient,
}


export const FormEditIngredientPreload = (props: React.PropsWithChildren<FormEditIngredientPreloadProps>) => {
  const {nextStep, forStep, backStep, handleIngredient, ingredientItemFromSelect} = props;
  const classes = useStyles();

  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>(ingredientItemFromSelect);

  const updateIngredientItem = (key: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    /*    console.log('here');*/
    setIngredientItem({...ingredientItem, [key]: e.target.value});
    handleIngredient(ingredientItem);
  };
  const updateIngredientNum = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIngredientItem({...ingredientItem, [key]: +e.target.value});
    handleIngredient(ingredientItem);
  };

  return (
    <React.Fragment>
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
        <Button
          variant='contained'
          color='primary'
          style={styles.button}
          onClick={function() {
            if (ingredientItem.name === '') {
              alert('Please fill in name field');
            } else if (isNaN(ingredientItem.inventory)) {
              alert('The inventory amount must be a number');
              /*              console.log(ingredientItem.inventory);*/
            } else if (ingredientItem.unit === '') {
              alert('Please fill in unit field');
            } else if (isNaN(ingredientItem.price)) {
              alert('The price must be a number');
            } else {
              nextStep(forStep);
              handleIngredient(ingredientItem);
            }
          }}>
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
      </FormControl>
    </React.Fragment>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
