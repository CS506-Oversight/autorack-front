import React, {} from 'react';
/* import Select from 'react-select';*/
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


/* type ConfirmationMenu = {
  value: string,
  label: string,
  step: number,
//   name: string,
//   desc: string,
//   price: number,
//   ingr: string,
//   amt: number,
//   unit: string,
}*/

/* const options: Array<ConfirmationMenu> = [
  {value: 'Menu', label: 'Create Menu Item', step: 2},
  {value: 'Ingredient', label: 'Create Ingredient', step: 3},
  {value: 'Edit Menu Item', label: 'Edit Menu Item', step: 4},
  {value: 'Edit Ingredient Item', label: 'Edit Ingredient Item', step: 8},
];*/

// const options: Array<ConfirmationMenu> = [
//     {name: 'name here', desc: 'desc here', price: 0, ingr: "ingr here", amt: 0, unit: "unit here"},
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
function createData(name: string, desc: string, price: number, ingr: string, amt: number, unit: string) {
  return {name, desc, price, ingr, amt, unit};
}

const rows = [
  createData('Frozen yoghurt', ' ', 6.0, 'ingr', 1, 'tsp'),
];


export const FormConfirmationMenu = (props: React.PropsWithChildren<ConfirmationFormProps>) => {
  const {nextStep, forStep, backStep} = props;

  const classes = useStyles();
  const setStep = () => {
    nextStep(forStep);
  };

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
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.desc}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.ingr}</TableCell>
                <TableCell align="right">{row.amt}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
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
