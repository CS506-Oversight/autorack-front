import React, {useEffect} from 'react';

import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import {RestockDataEntry} from '../../../state/restock/restockData';
import {RestockStatusType} from '../../../state/restock/restockData';
import {restockDispatchers} from '../../../state/restock/restockDispatchers';
import {useRestockSelector} from '../../../state/restock/restockSelector';
import {useDispatch} from '../../../state/store';
import {stableSort, getComparator, Order} from '../../../utils/Sort';
import PurchaseModal from './PurchaseModal';
import Status from './Status';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
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
    tablePagination: {
      backgroundColor: '#e3e3e3',
    },
  }),
);

const statusColors: { [key in RestockStatusType]: any } = {
  completed: 'success',
  processing: 'info',
  shipped: 'danger',
};

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

type EnhancedTableProps = {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<HTMLSpanElement>, property: keyof RestockDataEntry) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {classes, order, orderBy, onRequestSort} = props;
  const handleSort = (property: keyof RestockDataEntry) => (event: React.MouseEvent<HTMLSpanElement>) => {
    onRequestSort(event, property);
  };

  const tableClasses = useStyles();

  return (
    <TableHead>
      <TableRow className={tableClasses.tableRow}>
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

const RestockPurchasesTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {restockData} = useRestockSelector();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof RestockDataEntry>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getData = () => {
    dispatch(restockDispatchers.fetchRestockData());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof RestockDataEntry) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!restockData) {
    return <h1>No content to show.</h1>;
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, restockData.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="RestockPurchasesTable"
            aria-label="restock purchases table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(restockData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.purchaseDate}</TableCell>
                    <TableCell>
                      <Status
                        color={statusColors[row.status]}
                      />
                      {row.status}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell>
                      <PurchaseModal data={row.itemsData} orderId={row.id}/>
                    </TableCell>
                  </TableRow>;
                })}
              {emptyRows > 0 && <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={restockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.tablePagination}
        />
      </Paper>
    </div>
  );
};

export default RestockPurchasesTable;
