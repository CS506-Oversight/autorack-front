import React from 'react';

import {createStyles, makeStyles, TableCell, TableHead, TableRow, TableSortLabel} from '@material-ui/core';

import {RestockDataEntry} from '../../../state/restock/restockData';
import {Order} from '../../../utils/Sort';

const useStyles = makeStyles(() =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    tableRow: {
      backgroundColor: '#e3e3e3',
    },
  }),
);

type HeadCell = {
  columnName: keyof RestockDataEntry;
  label: string;
  numeric: boolean;
}

const headCells: Array<HeadCell> = [
  {columnName: 'id', numeric: false, label: 'Order #'},
  {columnName: 'purchaseDate', numeric: false, label: 'Purchase Date'},
  {columnName: 'status', numeric: false, label: 'Status'},
  {columnName: 'type', numeric: false, label: 'Type'},
  {columnName: 'totalPrice', numeric: true, label: 'Total Price ($)'},
];

type SortableTableProps = {
  onRequestSort: (event: React.MouseEvent<HTMLSpanElement>, property: keyof RestockDataEntry) => void;
  order: Order;
  orderBy: string;
}

const SortableTableHead = (props: SortableTableProps) => {
  const classes = useStyles();
  const {order, orderBy, onRequestSort} = props;
  const handleSort = (property: keyof RestockDataEntry) => (event: React.MouseEvent<HTMLSpanElement>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        {headCells.map((headCell) =>
          <TableCell
            key={headCell.columnName}
            sortDirection={orderBy === headCell.columnName ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.columnName}
              direction={orderBy === headCell.columnName ? order : 'asc'}
              onClick={handleSort(headCell.columnName)}
            >
              {headCell.label}
              {orderBy === headCell.columnName ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>,
        )}
        <TableCell>Purchase Info</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SortableTableHead;
