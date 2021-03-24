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

/* const options: Array<FirstChoice> = [
  {value: 'Menu', label: 'Create Menu Item', step: 2},
  {value: 'Ingredient', label: 'Create Ingredient', step: 3},
  {value: 'Edit', label: 'Edit Something?', step: 1},
];*/

type FormMenuItemProps = {
  nextStep: (step:number) => void,
  forStep:number,
  backStep:number,
    handleMenuItem: (item: MenuItem) => void,
}


export const FormMenuItem = (props: React.PropsWithChildren<FormMenuItemProps>) => {
  const {nextStep, forStep, backStep, handleMenuItem} = props;
  const classes = useStyles();

  const [menuItem, setMenuItem] = React.useState<MenuItem>({
    name: '',
    description: '',
    /*    imageURl: '',*/
    price: 0,
  });

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

  return (
    <React.Fragment>
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
    </React.Fragment>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
