import React from 'react';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {ItemDataInfo} from '../../../api/definitions/restock/data';
import AppValues from '../../../const/values';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableRow: {
    backgroundColor: '#e3e3e3',
  },
});

type RowData = ItemDataInfo & {
  price: number
};

type PurchaseOverviewProps = {
  data: Array<ItemDataInfo>;
}

const PurchaseOverview = ({data}: PurchaseOverviewProps) => {
  const classes = useStyles();

  const formatCurrency = (num: number) => {
    return `${num.toFixed(2)}`;
  };

  const calcSubtotal = (items: Array<RowData>) => {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
  };

  const rows = data.map((elem) => {
    return {
      description: elem.description,
      quantity: elem.quantity,
      unitPrice: elem.unitPrice,
      price: elem.quantity * elem.unitPrice,
    };
  });

  const invoiceSubtotal = calcSubtotal(rows);
  const invoiceTaxes = AppValues.TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="restock purchase overview">
        <TableHead>
          <TableRow className={classes.tableRow}>
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
              <TableCell align="right">{formatCurrency(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{`$${formatCurrency(invoiceSubtotal)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(AppValues.TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{`$${formatCurrency(invoiceTaxes)}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{`$${formatCurrency(invoiceTotal)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseOverview;
