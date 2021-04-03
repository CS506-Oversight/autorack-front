import React, {} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}

type ConfirmationFormProps = {
  nextStep: (step:number) => void,
  forStep: number,
  backStep: number,
    ingredientItem:Ingredient,
    handleIngredient: (item: Ingredient) => void,
    updateIngredientList: (placeArray:Ingredient) => void,
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const FormConfirmationIngredient = (props: React.PropsWithChildren<ConfirmationFormProps>) => {
  const {nextStep, forStep, backStep, ingredientItem, handleIngredient,
    updateIngredientList} = props;

  const classes = useStyles();
  const setStep = () => {
    nextStep(forStep);
  };

  const resetIngredient = () => {
    const temp:Ingredient = {
      name: '',
      inventory: 0,
      unit: '',
      price: 0,
    };
    handleIngredient(temp);
  };

  return (

    <React.Fragment>
      <h3>Your New Ingredient</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Inventory</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {ingredientItem.name}
              </TableCell>
              <TableCell align="right">{ingredientItem.unit}</TableCell>
              <TableCell align="right">{ingredientItem.inventory}</TableCell>
              <TableCell align="right">{ingredientItem.price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={function() {
          setStep();
          resetIngredient();
          updateIngredientList(ingredientItem);
        }}>
              Confirm
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

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
