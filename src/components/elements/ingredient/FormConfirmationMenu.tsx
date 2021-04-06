import React, {useEffect, useState} from 'react';

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

// Define all types
type MenuIngredient = {
    name: string,
    measurement: string,
    amount: number,
    menuItem: string,
};

type MenuItem = {
    name: string,
    description: string,
    price: number,
}

type ConfirmationFormProps = {
  nextStep: (step:number) => void,
  forStep: number,
  backStep: number,
    menuIngredientArray: Array<MenuIngredient>,
    menuItemFinalArray: Array<MenuItem>,
    updateMenuIngredientFinalArray: (placeArray:Array<MenuIngredient>) => void,
    updateMenuList: (placeArray:Array<MenuItem>) => void,
}
// basic styling
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export const FormConfirmationMenu = (props: React.PropsWithChildren<ConfirmationFormProps>) => {
  const {nextStep, forStep, backStep, menuIngredientArray, menuItemFinalArray,
    updateMenuIngredientFinalArray, updateMenuList} = props;

  const classes = useStyles();

  // function for updating the step
  const setStep = () => {
    nextStep(forStep);
  };

  // anytime final array of menu items is updated update rows in confirmation page
  useEffect(() => {
    makeTableRows();
  }, [menuItemFinalArray]);

  // anytime final array of ingredients is updated update rows in confirmation page
  useEffect(() => {
    makeTableRows();
  }, [menuIngredientArray]);

  // define array for holding # of ingredients per row
  const rowNums: Array<number> = [];

  // function for filling rowNums, always empties array to start
  const makeTableRows = () => {
    while (rowNums.length != 0) {
      rowNums.pop();
    }
    for (let i = 0; i < menuItemFinalArray.length; i++) {
      let num = 0;
      for (const item of menuIngredientArray) {
        if (item.menuItem === menuItemFinalArray[i].name) {
          num+=1;
        }
      }
      rowNums.push(num+1);
    }
  };

  // Dispatch Stuff
  const dispatch = useDispatch();

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    fetched: false,
    fetching: false,
  });

  const onSubmitMenuItems = () => {
    setFetchStatus({
      fetching: true,
      fetched: false,
    });
    dispatch(menuDispatchers.sendMenuItems(menuItemFinalArray))
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
    dispatch(menuDispatchers.sendMenuIngredients(menuIngredientArray))
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

  // Fill array at start first time the page loads
  makeTableRows();


  return (

    <>
      <h3>Your New Menu Item</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Ingredient</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Unit</TableCell>
            </TableRow>
          </TableHead>
          {menuItemFinalArray.map((row:MenuItem, index:number) =>
            <TableBody key={row.name}>
              <TableRow>
                <TableCell component="th" scope="row" rowSpan={rowNums[index]}>{row.name}</TableCell>
                <TableCell align="right" rowSpan={rowNums[index]}>{row.description}</TableCell>
                <TableCell align="right" rowSpan={rowNums[index]}>${row.price}</TableCell>
              </TableRow>
              {menuIngredientArray.map((ingRow:MenuIngredient, count:number) =>
                (ingRow.menuItem === row.name) ?
                  <TableRow key = {count}>
                    <TableCell align="right" >{ingRow.name}</TableCell>
                    <TableCell align="right" >{ingRow.amount}</TableCell>
                    <TableCell align="right" >{ingRow.measurement}</TableCell>
                  </TableRow>: null,
              )}
            </TableBody>,
          )}
        </Table>
      </TableContainer>
      <UIButton
        text = {fetchStatus.fetching ? 'Loading...' : 'Continue'}
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={function() {
          setStep();
          updateMenuIngredientFinalArray(menuIngredientArray);
          updateMenuList(menuItemFinalArray);
          onSubmitMenuItems();
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
        Back
      </UIButton>
    </>

  );
};

const styles = {
  button: {
    margin: 15,
  },

};
