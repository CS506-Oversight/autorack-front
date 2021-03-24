import React, {ChangeEvent} from 'react';
/* import Select from 'react-select';*/
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField, Button,
} from '@material-ui/core';
import Select from 'react-select';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: 15,
    },

  }),
);

/* type MenuIngredient = {
    name: string,
    measurement: string,
    amount: number,
};*/

 type MenuIngredientForForm = {
    name: string,
    measurement: string,
    amount: number,
    value: string,
     used:boolean,
};
/* type MenuIngredientList = Array<MenuIngredient> [];*/

type Measurement = {
    value: string,
    label: string,
};

type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
};
// make MenuIngredient
const IngredientObjectList = new Map<string, MenuIngredientForForm>();

const IngredientList: Array<Ingredient> = [
  {name: 'Butter', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Ham', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Water', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Noodles', inventory: 2, unit: 'Tbsp', price: 5.00},
  {name: 'Tomatoes', inventory: 2, unit: 'Tbsp', price: 5.00},
];

const Measurements: Array<Measurement> = [
  {value: 'tsp', label: 'tsp'},
  {value: 'Tbsp', label: 'Tbsp'},
  {value: 'cup', label: 'cup'},
  {value: 'oz', label: 'oz'},
  {value: 'pinch', label: 'pinch'},
  {value: 'tsp', label: 'tsp'},
];


/*  const {nextStep, prevStep, handleIngredient} = props;*/
export const FormAddIngredients = () => {
  const classes = useStyles();


  /*  const [ingredientsForMenu, setIngredientsForMenu] = React.useState<MenuIngredientList>([]);*/
  // /*    e: React.ChangeEvent<HTMLInputElement>*/
  const handleCheck = ( e: React.ChangeEvent<HTMLInputElement>) => {
    if (IngredientObjectList.has(e.target.value)) {
      // @ts-ignore
      IngredientObjectList.get(e.target.value).used = !IngredientObjectList.get(e.target.value).used;
    }
    console.log(IngredientObjectList.get(e.target.value));
    console.log(e.target.value);
  };

  const handleSelect= ( selectedOption: Measurement | null, name: string) => {
    if (!selectedOption) {
      return;
    }
    if (IngredientObjectList.has(name)) {
      // @ts-ignore
      IngredientObjectList.get(name).measurement = selectedOption.value;
    }
    console.log(IngredientObjectList.get(name));
  };

  const handleAmount= (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (IngredientObjectList.has(name)) {
      // @ts-ignore
      IngredientObjectList.get(name).amount = e.target.value;
    }
    console.log(IngredientObjectList.get(name));
  };


  const makeObjects = () => {
    for (const item of IngredientList) {
      IngredientObjectList.set(item.name, {
        name: item.name,
        measurement: '',
        amount: 0,
        value: '',
        used: false,
      });
    }
  };
  makeObjects();
  return (

    <div>


      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend"></FormLabel>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
              Select Ingredients
          </Grid>
          <Grid item xs={12} sm={4}>
                Select Measurment
          </Grid>
          <Grid item xs={12} sm={4}>
                Select Amount
          </Grid>
        </Grid>
        {IngredientList.map((item) =>
          <FormGroup key = {item.name}>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={<
                    Checkbox
                    value = {item.name}
                    /*                    checked={true}*/
                    onChange={handleCheck}
                    name="gilad" />}
                  label={item.name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Select
                  /*                  value={selection}*/
                  onChange={(option) => handleSelect(option, item.name)}
                  options={Measurements}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type = 'number'
                  id="Unit"
                  label="Amount"
                  onChange={handleAmount(item.name)}
                  /*                                  defaultValue={ingredientItem.unit}*/
                  variant="filled"
                />
              </Grid>

            </Grid>
          </FormGroup>,
        )}

      </FormControl>
      <Button
        variant='contained'
        color='primary'
        style={styles.button}
        /*              onClick={function() {
                  nextStep(4); // needs to be set
handleMenuItem(menuItem);
              }} */
      >

                  Add Ingredient
      </Button>

    </div>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
