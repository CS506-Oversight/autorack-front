import React, {} from 'react';
/* import Select from 'react-select';*/
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@material-ui/core';
import Select from 'react-select';


const drawerWidth = 240;
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
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
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

    type MenuIngredient = {
        name: string,
        measurement: string,
        amount: number,
    }

    const MenuItemIngredients: Array<MenuIngredient> = [
      {name: 'Menu', measurement: 'tsp', amount: 2},
      {name: 'Ingredient', measurement: 'cup', amount: 3},
      {name: 'Edit', measurement: 'oz', amount: 1},
    ];

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
          <FormLabel component="legend">Select Ingredients</FormLabel>
          <FormGroup>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={<
                    Checkbox
                    /*                  checked={gilad}
                  onChange={handleChange}*/
                    name="gilad" />}
                  label="Butter"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Select
                /*                    value={selection}
                    onChange={(option) => handleSelect(option)}*/
                  options={MenuItemIngredients}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="Unit"
                  label="Amount"
                  /*                onChange={updateIngredientItem('unit')}
                    defaultValue={ingredientItem.unit}*/
                  variant="filled"
                />
              </Grid>

            </Grid>
          </FormGroup>
        </FormControl>

      </div>


    /*    <div>
      <Grid container spacing={3}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={<
                  Checkbox
                  /!*                checked={gilad}*!/
                  /!*              onChange={handleChange}*!/
                  name="gilad" />}
                label="Gilad Gray"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth={false} className={classes.formControl} variant="filled">

                <TextField
                  id="Unit"
                  label="Unit of Measurement for Ingredient"
                  /!*                onChange={updateIngredientItem('unit')}
                      defaultValue={ingredientItem.unit}*!/
                  variant="filled"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth={false} className={classes.formControl} variant="filled">

                <TextField
                  id="Unit"
                  label="Unit of Measurement for Ingredient"
                  /!*                onChange={updateIngredientItem('unit')}
                              defaultValue={ingredientItem.unit}*!/
                  variant="filled"
                />
              </FormControl>
            </Grid>
          </FormGroup>
        </FormControl>
      </Grid>
    </div>*/


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
