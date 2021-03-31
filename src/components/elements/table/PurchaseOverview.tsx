import React from 'react';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {ItemDataInfo} from '../../../state/restock/restockData';

/**
 * TODO: FIND A WAY TO REFACTOR CODE IF NECESSARY
 * TODO: SET A GLOBAL STYLE FOR TABLE COLORS (SHOULD BE EASY)
 */

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

type RowData = ItemDataInfo & {price: number};

type PurchaseOverviewProps = {
  data: Array<ItemDataInfo>;
}

const PurchaseOverview = ({data}: PurchaseOverviewProps) => {
  const classes = useStyles();

  const ccyFormat = (num: number) => {
    return `${num.toFixed(2)}`;
  };

  const priceRow = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  const createRow = (description: string, quantity: number, unitPrice: number) => {
    const price = priceRow(quantity, unitPrice);
    return {description, quantity, unitPrice, price};
  };

  const subtotal = (items: RowData[]) => {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
  };

  const rows = [];
  for (const elm of data) {
    rows.push(createRow(elm.description, elm.quantity, elm.unitPrice));
  }

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow style={{backgroundColor: '#e3e3e3'}}>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.description}>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.unitPrice}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{`$${ccyFormat(invoiceSubtotal)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{`$${ccyFormat(invoiceTaxes)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{`$${ccyFormat(invoiceTotal)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseOverview;
