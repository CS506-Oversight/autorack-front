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

import {RestockDataInfo} from '../../../state/restock/restockData';
import {restockDispatchers} from '../../../state/restock/restockDispatchers';
import {useRestockSelector} from '../../../state/restock/restockSelector';
import {useDispatch} from '../../../state/store';
import {stableSort, getComparator, Order} from '../../../utils/Sort';
import PurchaseModal from './PurchaseModal';
import Status from './Status';

const statusColors : { [key: string]: any } = {
  completed: 'success',
  processing: 'info',
  shipped: 'danger',
};

type HeadCell = {
  id: keyof RestockDataInfo;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {id: 'id', numeric: false, label: 'Order #'},
  {id: 'purchaseDate', numeric: false, label: 'Purchase Date'},
  {id: 'status', numeric: false, label: 'Status'},
  {id: 'totalPrice', numeric: true, label: 'Total Price ($)'},
];

type EnhancedTableProps = {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RestockDataInfo) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof RestockDataInfo) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{backgroundColor: '#e3e3e3'}}>
        {headCells.map((headCell) =>
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>,

        )}
        <TableCell>{'Purchase Info'}</TableCell>
      </TableRow>
    </TableHead>
  );
};

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
  }),
);

export const RestockPurchasesTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {restockData} = useRestockSelector();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof RestockDataInfo>('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getData = () => {
    dispatch(restockDispatchers.fetchRestockData());
  };

  useEffect(() => {
    getData();
  }, []);


  // TODO: FIGURE OUT IF THIS SHOULD BE A REDUX ACTION OR NOT
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof RestockDataInfo) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let emptyRows = 0;
  if (restockData != null) {
    emptyRows = rowsPerPage - Math.min(rowsPerPage, restockData.length - page * rowsPerPage);
  }

  return (
    <div className={classes.root}>
      {
        restockData != null ?
          <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
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
              style={{backgroundColor: '#e3e3e3'}}
            />
          </Paper> :
          <h1>No content to show.</h1>
      }
    </div>
  );
};
