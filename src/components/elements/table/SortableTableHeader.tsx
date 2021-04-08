import React from 'react';

import {
  createStyles,
  makeStyles,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

import {Order} from '../../../utils/sort';

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

export type SortableTableHeaderCell<T extends string> = {
  columnName: T;
  label: string;
  numeric: boolean;
}

type SortableTableHeaderProps<T extends string> = {
  onSort: (event: React.MouseEvent<HTMLSpanElement>, property: T) => void,
  order: Order,
  orderBy: string,
  title: string,
  headCells: Array<SortableTableHeaderCell<T>>,
}

const SortableTableHeader = <T extends string>(props: SortableTableHeaderProps<T>) => {
  const classes = useStyles();
  const {order, orderBy, title, headCells, onSort} = props;
  const handleSort = (columnName: T) => (event: React.MouseEvent<HTMLSpanElement>) => {
    onSort(event, columnName);
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
              {
                orderBy === headCell.columnName ?
                  (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) :
                  null
              }
            </TableSortLabel>
          </TableCell>,
        )}
        <TableCell>{title}</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SortableTableHeader;
