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


// const options: Array<ConfirmationIngredient> = [
//     {name: 'name here', unit: 'unit here', inv: 0, price: 0},
//   ];

type ConfirmationFormProps = {
  nextStep: (step:number) => void,
  forStep: number,
  backStep: number,
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// eslint-disable-next-line require-jsdoc
function createData(name: string, unit: string, inv: number, price: number) {
  return {name, unit, inv, price};
}

const rows = [
  createData('Something Here', 'desc', 6.0, 1),
];


export const FormConfirmationIngredient = (props: React.PropsWithChildren<ConfirmationFormProps>) => {
  const {nextStep, forStep, backStep} = props;

  const classes = useStyles();
  const setStep = () => {
    nextStep(forStep);
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.inv}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant='contained'
        color='primary'
        style={styles.button}
        onClick={setStep}>
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
