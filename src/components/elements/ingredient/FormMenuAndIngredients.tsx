import React, {ChangeEvent} from 'react';
/* import Select from 'react-select';*/
import {
  Button,
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
/* import {FormAddIngredients} from './FormAddIngredients';*/
import Select from 'react-select';

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


type MenuItem = {
    name: string,
    description: string,
    /*    imageURl: string,*/
    price: number,
}

type MenuIngredientForForm = {
    name: string,
    measurement: string,
    amount: number,
    value: string,
    used:boolean,
};
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

type MenuIngredient = {
    name: string,
    measurement: string,
    amount: number,
    menuItem: string,
};

/* type MenuIngredientList = Array<MenuIngredient> [];*/

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


type FormMenuAndIngredientProps = {
    nextStep: (step:number) => void,
    forStep:number,
    backStep:number,
    handleMenuItem: (item: MenuItem) => void,
}


export const FormMenuAndIngredients = (props: React.PropsWithChildren<FormMenuAndIngredientProps>) => {
  const {nextStep, forStep, backStep, handleMenuItem} = props;
  const classes = useStyles();

  const [menuItem, setMenuItem] = React.useState<MenuItem>({
    name: '',
    description: '',
    /*    imageURl: '',*/
    price: 0,
  });

  const [menuIngredientArray, setMenuIngredientArray] = React.useState<Array<MenuIngredient>>([]);

  const updateMenuItem = (key: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMenuItem({...menuItem, [key]: e.target.value});
    handleMenuItem(menuItem);
    console.log(menuItem.name);
    /*    console.log(menuItem.imageURl);*/
    console.log(key);
  };

  const updateMenuPrice = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setMenuItem({...menuItem, [key]: +e.target.value});
    handleMenuItem(menuItem);
    console.log(menuItem.price);
    /*    console.log(e.target.value);*/
  };

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

  const checkIngredientFill = () => {
    let consoleLine = 'These ingredients need to be completed: \n';
    let gtg = true;
    // const menuIngredientArray =
    IngredientObjectList.forEach((value: MenuIngredientForForm, key: string) => {
      console.log(key, value);
      if (value.used) {
        if ((value.measurement === '') || (value.amount == 0)) {
          gtg = false;
          consoleLine += key;
          consoleLine +='\n';
        } else {
          const nowArray = menuIngredientArray;
          const menuThing :MenuIngredient = {
            name: value.name,
            measurement: value.measurement,
            amount: value.amount,
            menuItem: menuItem.name,
          };
          nowArray.push(menuThing);
          setMenuIngredientArray(nowArray);
          /* setMenuIngredientArray((menuIngredientArray) =>[...menuIngredientArray, menuThing]);*/
        }
      }
    });
    if (!gtg) {
      alert(consoleLine);
    }
    console.log(menuIngredientArray);
    return gtg;
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
    <React.Fragment>
      <div>
        <Paper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>

              <FormControl fullWidth={false} className={classes.margin} variant="filled">
                <h3>Fill in Menu Item Things and change this line</h3>
                <TextField
                  id="Name"
                  label="Name"
                  onChange={updateMenuItem('name')}
                  defaultValue={menuItem.name}
                  variant="filled"
                />
                <br/>
                <TextField
                  id="Description"
                  label="Description"
                  multiline
                  rowsMax={10}
                  onChange={updateMenuItem('description')}
                  defaultValue={menuItem.description}
                  variant="filled"
                />
                {/*        <br/>
        <TextField
          id="imageURL"
          label="Image Url"
          onChange={updateMenuItem('imageURL')}
          defaultValue={menuItem.imageURl}
          variant="filled"
        />*/}
                <br/>
                <FormControl fullWidth = {false} className={classes.margin} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Price</InputLabel>
                  <FilledInput
                    type = 'number'
                    onChange={updateMenuPrice('price')}
                    defaultValue={menuItem.price}
                    id="filled-adornment-password"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </FormControl>

                <Button
                  variant='contained'
                  color='primary'
                  style={styles.button}
                  onClick={function() {
                    if (menuItem.name === '') {
                      alert('Please fill in name field');
                    } else if (menuItem.description === '') {
                      alert('Please fill in description field');
                    } else if (isNaN(menuItem.price)) {
                      alert('The price must be a number');
                    } else if (!checkIngredientFill()) {

                    } else {
                      console.log(menuItem.price);
                      nextStep(forStep); // needs to be set
                      handleMenuItem(menuItem);
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
                  onClick={function() {
                    nextStep(6); // needs to be set
                    /*                    handleMenuItem(menuItem);*/
                  }}
                >

                        Add Ingredient
                </Button>

              </div>

            </Grid>
          </Grid>
        </Paper>
      </div>
    </React.Fragment>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
