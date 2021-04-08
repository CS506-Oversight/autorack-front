import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import AppValues from '../../../../const/values';

type PurchaseOverviewSummaryProps = {
  subtotal: number,
  currencyFormatter: (num: number) => string,
}

export const PurchaseOverviewSummary = ({currencyFormatter, subtotal}: PurchaseOverviewSummaryProps) => {
  const invoiceTaxes = AppValues.TAX_RATE * subtotal;
  const invoiceTotal = invoiceTaxes + subtotal;

  return (
    <>
      <TableRow>
        <TableCell rowSpan={3}/>
        <TableCell colSpan={2}>Subtotal</TableCell>
        <TableCell align="right">{`$${currencyFormatter(subtotal)}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Tax</TableCell>
        <TableCell align="right">{`${(AppValues.TAX_RATE * 100).toFixed(0)} %`}</TableCell>
        <TableCell align="right">{`$${currencyFormatter(invoiceTaxes)}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell align="right">{`$${currencyFormatter(invoiceTotal)}`}</TableCell>
      </TableRow>
    </>
  );
};
