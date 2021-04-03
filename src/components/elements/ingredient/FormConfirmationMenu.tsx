import React, {useEffect} from 'react';

/* import Select from 'react-select';*/
import {Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export const FormConfirmationMenu = (props: React.PropsWithChildren<ConfirmationFormProps>) => {
  const {nextStep, forStep, backStep, menuIngredientArray, menuItemFinalArray,
    updateMenuIngredientFinalArray, updateMenuList} = props;

  const classes = useStyles();
  const setStep = () => {
    nextStep(forStep);
  };

  useEffect(() => {
    makeTableRows();
  }, [menuItemFinalArray]);

  useEffect(() => {
    makeTableRows();
  }, [menuIngredientArray]);

  const rowNums: Array<number> = [];
  const makeTableRows = () => {
    while (rowNums.length != 0) {
      rowNums.pop();
    }
    for (let i = 0; i<menuItemFinalArray.length; i++) {
      let num = 0;
      for (const item of menuIngredientArray) {
        if (item.menuItem === menuItemFinalArray[i].name) {
          num+=1;
        }
      }
      rowNums.push(num+1);
    }
  };
  makeTableRows();
  return (

    <React.Fragment>
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
      <Button
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={function() {
          setStep();
          updateMenuIngredientFinalArray(menuIngredientArray);
          updateMenuList(menuItemFinalArray);
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
