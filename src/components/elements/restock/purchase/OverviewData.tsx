import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {PurchaseItemInfoCalculated} from '../../../../api/definitions/restock/data';

type PurchaseOverviewDataProps = {
  data: Array<PurchaseItemInfoCalculated>,
  currencyFormatter: (num: number) => string,
}

export const PurchaseOverviewData = ({data, currencyFormatter}: PurchaseOverviewDataProps) => {
  return (
    <>
      {
        data.map((row) => (
          <TableRow key={row.description}>
            <TableCell>{row.description}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">{row.unitPrice}</TableCell>
            <TableCell align="right">{currencyFormatter(row.price)}</TableCell>
          </TableRow>
        ))
      }
    </>
  );
};
