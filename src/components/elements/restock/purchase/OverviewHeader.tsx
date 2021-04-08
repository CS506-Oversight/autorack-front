import React from 'react';

import {makeStyles} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  tableRow: {
    backgroundColor: '#e3e3e3',
  },
});

export const PurchaseOverviewHeader = () => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        <TableCell align="center" colSpan={3}>
          Details
        </TableCell>
        <TableCell align="right">Price</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Description</TableCell>
        <TableCell align="right">Qty.</TableCell>
        <TableCell align="right">Unit Price</TableCell>
        <TableCell align="right">Sum</TableCell>
      </TableRow>
    </TableHead>
  );
};
