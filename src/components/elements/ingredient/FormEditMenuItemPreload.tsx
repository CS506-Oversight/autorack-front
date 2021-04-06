import React, {ChangeEvent} from 'react';

import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  FilledInput,
  TextField,
  InputLabel,
  Paper,
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Select from 'react-select';

import UIButton from '../ui/Button';

// Define Styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '10ch',
  },
  button: {
    margin: 15,
  },
}));

// Declare types
type MenuItem = {
  name: string,
  description: string,
  price: number,
}

type MenuIngredientForForm = {
  name: string,
  measurement: Measurement,
  amount: number,
  value: string,
  used:boolean,
};
type Measurement = {
  value: string,
  label: string,
};


type FormEditMenuItemPreloadProps = {
  nextStep: (step:number) => void,
  forStep:number,
  backStep:number,
  newIng: number,
  handleMenuItem: (item: MenuItem) => void,
  menuItem: MenuItem,
  Measurements: Array<Measurement>,
  IngredientListToPage: Array<MenuIngredientForForm>,
  handleMenuIngredientList: (item:Array<MenuIngredientForForm>) => void,
  checkIngredientFill: () => boolean,
  updateAdjacentIngredientArray:(index:number) => void,
  updateAdjacentArray:(index:number) => void,

}


export const FormEditMenuItemPreload = (props: React.PropsWithChildren<FormEditMenuItemPreloadProps>) => {
  const {nextStep, forStep, backStep, newIng, handleMenuItem, menuItem,
    Measurements, IngredientListToPage, handleMenuIngredientList, checkIngredientFill,
    updateAdjacentIngredientArray, updateAdjacentArray} = props;

  const classes = useStyles();

  // Updates menu Item in EditMenu.tsx
  const updateMenuItem = (key: string)=> (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleMenuItem({...menuItem, [key]: e.target.value});
  };

  // Updates menu Item Price in EditMenu.tsx
  const updateMenuPrice = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    handleMenuItem({...menuItem, [key]: +e.target.value});
  };

  // Handles checkbox changes and updates
  const handleCheck = (name:string) => {
    for (let i = 0; i<IngredientListToPage.length; i++) {
      if (name == IngredientListToPage[i].name) {
        IngredientListToPage[i].used=!IngredientListToPage[i].used;
      }
    }
    handleMenuIngredientList(IngredientListToPage);
  };

  // Handles Select changes and updates
  const handleSelect= (selectedOption: Measurement | null, name: string) => {
    if (!selectedOption) {
      return;
    }
    for (let i = 0; i<IngredientListToPage.length; i++) {
      if (name == IngredientListToPage[i].name) {
        IngredientListToPage[i].measurement=selectedOption;
      }
    }
    handleMenuIngredientList(IngredientListToPage);
  };

  // Handles amount input changes and updates
  const handleAmount= (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i<IngredientListToPage.length; i++) {
      if (name == IngredientListToPage[i].name) {
        IngredientListToPage[i].amount=+e.target.value;
      }
    }
    handleMenuIngredientList(IngredientListToPage);
  };

  // Handles when add button is clicked
  const handleAddButton = () => {
    if (menuItem.name === '') {
      alert('Please fill in name field');
    } else if (menuItem.description === '') {
      alert('Please fill in description field');
    } else if (isNaN(menuItem.price)) {
      alert('The price must be a number');
    } else if (!checkIngredientFill()) {

    } else {
      handleMenuIngredientList(IngredientListToPage);

      updateAdjacentIngredientArray(0);
      handleMenuIngredientList(IngredientListToPage);
      updateAdjacentArray(0);
      nextStep(forStep);
    }
  };

  return (
    <>
      <div>
        <Paper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth={false} className={classes.margin} variant="filled">
                <h3>Fill in to create a new menu item.</h3>
                <TextField
                  id="Name"
                  label="Name"
                  value = {menuItem.name}
                  defaultValue={menuItem.name}
                  variant="filled"
                />
                <br/>
                <TextField
                  id="Description"
                  label="Description"
                  multiline
                  rowsMax={10}
                  value = {menuItem.description}
                  onChange={updateMenuItem('description')}
                  defaultValue={menuItem.description}
                  variant="filled"
                />
                <br/>
                <FormControl fullWidth = {false} className={classes.margin} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Price</InputLabel>
                  <FilledInput
                    type = 'number'
                    onChange={updateMenuPrice('price')}
                    value = {menuItem.price}
                    defaultValue={menuItem.price}
                    id="filled-adornment-password"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </FormControl>

                <UIButton
                  text = 'Add'
                  variant='contained'
                  color='primary'
                  style={styles.button}
                  onClick={handleAddButton}
                >
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
            </Grid>
            <Grid item xs={12} sm={8}>
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
                  {IngredientListToPage.map((item:MenuIngredientForForm, index:number) =>
                    <FormGroup key = {index}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <FormControlLabel
                            control={<
                              Checkbox
                              defaultChecked={item.used}
                              checked={item.used}
                              value = {item.name}
                              onChange={() => {
                                handleCheck(item.name);
                              }}
                              name="gilad" />}
                            label={item.name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Select
                            defaultValue={item.measurement}
                            value = {item.measurement}
                            onChange={(option) => handleSelect(option, item.name)}
                            options={Measurements}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            defaultValue={item.amount}
                            value = {item.amount}
                            type = 'number'
                            id="Unit"
                            label="Amount"
                            onChange={handleAmount(item.name)}
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                    </FormGroup>,
                  )}
                </FormControl>
                <UIButton
                  text = 'Add Ingredient'
                  variant='contained'
                  color='primary'
                  style={styles.button}
                  onClick={function() {
                    if (checkIngredientFill()) {
                      nextStep(newIng);
                    }
                  }}
                >
                </UIButton>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

const styles = {
  button: {
    margin: 15,
  },
};
