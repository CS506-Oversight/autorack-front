import React, {useState} from 'react';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {unwrapResult} from '@reduxjs/toolkit';

import {FetchStatus} from '../../../api/definitions/misc';
import {alertDispatchers} from '../../../state/alert/dispatchers';
import {menuDispatchers} from '../../../state/menu/menu_dispatchers';
import {useDispatch} from '../../../state/store';
import UIButton from '../ui/Button';

// Declare all types
type Ingredient = {
    name: string,
    inventory: number,
    unit: string,
    price: number,
}

type ConfirmationFormProps = {
  nextStep: (step: number) => void,
  forStep: number,
  backStep: number,
    ingredientItem: Ingredient,
    handleIngredient: (item: Ingredient) => void,
    updateIngredientList: (placeArray: Ingredient) => void,
}
// define styles
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const FormConfirmationIngredient = (props: React.PropsWithChildren<ConfirmationFormProps>) => {
  const {nextStep, forStep, backStep, ingredientItem, handleIngredient,
    updateIngredientList} = props;

  const classes = useStyles();

  // function for setting next step
  const setStep = () => {
    nextStep(forStep);
  };

  // sets ingredient back to original state
  const resetIngredient = () => {
    const temp:Ingredient = {
      name: '',
      inventory: 0,
      unit: '',
      price: 0,
    };
    handleIngredient(temp);
  };


  // Dispatch Stuff
  const dispatch = useDispatch();

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    fetched: false,
    fetching: false,
  });

  const onSubmitIngredient = () => {
    setFetchStatus({
      fetching: true,
      fetched: false,
    });
    dispatch(menuDispatchers.sendIngredient(ingredientItem))
      .then(unwrapResult)
      .catch((error) => {
        setFetchStatus({
          fetching: false,
          fetched: true,
        });
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      })
      .finally(() => {
        setFetchStatus({
          fetching: false,
          fetched: true,
        });
      },
      );
  };

  return (

    <>
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
      <UIButton
        text = {fetchStatus.fetching ? 'Loading...' : 'Continue'}
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={function() {
          setStep();
          resetIngredient();
          updateIngredientList(ingredientItem);
          onSubmitIngredient();
        }}>
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
    </>

  );
};

const styles = {
  button: {
    margin: 15,
  },
};
