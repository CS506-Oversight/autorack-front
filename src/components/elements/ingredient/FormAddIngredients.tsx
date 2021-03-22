import React, {} from 'react';
/* import Select from 'react-select';*/
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {TextField, FormControl, FormLabel, FormGroup, Checkbox,
  FormControlLabel, FormHelperText} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },

  }),
);


/*
type IngredientForMenu = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}
*/

/* const options: Array<FirstChoice> = [
  {value: 'Menu', label: 'Create Menu Item', step: 2},
  {value: 'Ingredient', label: 'Create Ingredient', step: 3},
  {value: 'Edit', label: 'Edit Something?', step: 1},
];*/

/*
type FormIngredientProps = {
    nextStep: (step:number) => void,
    prevStep: () => void,
    handleIngredient: (item: Ingredient) => void,
}
*/


export const FormAddIngredients = () => {
/*  const {nextStep, prevStep, handleIngredient} = props;*/
  const classes = useStyles();

  /*  const [ingredientItem, setIngredientItem] = React.useState<Ingredient>({
    name: '',
    inventory: 0,
    unit: '',
    price: 0,
  });*/

  /*  const updateIngredientItem = (key: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientItem({...ingredientItem, [key]: e.target.value});
    handleIngredient(ingredientItem);
  };
  const updateIngredientNum = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setIngredientItem({...ingredientItem, [key]: e.target.value});
    handleIngredient(ingredientItem);
  };*/
  /*  const {gilad, jason, antoine} = state;*/
  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<
              Checkbox
              /*                checked={gilad}*/
              /*              onChange={handleChange}*/
              name="gilad" />}
            label="Gilad Gray"
          />

          <FormControlLabel
            control={<Checkbox
              /*                checked={jason}*/
              /*              onChange={handleChange}*/
              name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox
              /*                checked={antoine}*/
              /*              onChange={handleChange}*/
              name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      <FormControl fullWidth={false} className={classes.formControl} variant="filled">

        <TextField
          id="Unit"
          label="Unit of Measurement for Ingredient"
          /*                onChange={updateIngredientItem('unit')}
                defaultValue={ingredientItem.unit}*/
          variant="filled"
        />
      </FormControl>
    </div>


  /*    <Paper elevation={3}>
      <React.Fragment>
        <FormControl fullWidth={false} className={classes.margin} variant="filled">
          <h3>Fill in Ingredient Item Things and change this line</h3>
          <TextField
            id="Name"
            label="Name"
            onChange={updateIngredientItem('name')}
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
              onChange={updateIngredientNum('inventory')}
              defaultValue={ingredientItem.price}
              id="filled-adornment-password"
            />
          </FormControl>
          <br/>
          <FormControl fullWidth = {false} className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
                            Price - Price to buy One Unit Worth of Inventory
            </InputLabel>
            <FilledInput
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
              nextStep(4); // needs to bet set
              handleIngredient(ingredientItem);
            }}>
                        Continue
          </Button>
          <Button
            variant='contained'
            color='primary'
            style={styles.button}
            onClick={prevStep}>
                        Back
          </Button>
        </FormControl>
      </React.Fragment>
    </Paper>*/

  );
};

/* const styles = {
  button: {
    margin: 15,
  },
};*/
