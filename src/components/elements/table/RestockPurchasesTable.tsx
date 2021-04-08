import React, {useEffect} from 'react';

import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {unwrapResult} from '@reduxjs/toolkit';

import {alertDispatchers} from '../../../state/alert/dispatchers';
import {RestockData, RestockItemInfo} from '../../../state/restock/restockData';
import {RestockStatusType} from '../../../state/restock/restockData';
import {restockDispatchers} from '../../../state/restock/restockDispatchers';
import {useDispatch} from '../../../state/store';
import {Order, sort} from '../../../utils/sort';
import {NoData} from './NoData';
import PurchaseModal from './PurchaseModal';
import Status from './Status';
import SortableTableHead from './TableHeader';

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
    tablePagination: {
      backgroundColor: '#e3e3e3',
    },
  }),
);

const statusColors: { [key in RestockStatusType]: string } = {
  completed: 'success',
  processing: 'info',
  shipped: 'danger',
};

type PageState = {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof RestockItemInfo;
}

const RestockPurchasesTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [restockData, setRestockData] = React.useState<RestockData>([]);
  const [pageState, setPageState] = React.useState<PageState>({
    page: 0,
    rowsPerPage: 10,
    order: 'asc',
    orderBy: 'id',
  });

  const getData = () => {
    dispatch(restockDispatchers.fetchRestockData())
      .then(unwrapResult)
      .then((result) => setRestockData(result))
      .catch((error) => {
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRequestSort = (event: React.MouseEvent<HTMLSpanElement>, property: keyof RestockItemInfo) => {
    const isAsc = pageState.orderBy === property && pageState.order === 'asc';
    setPageState({
      ...pageState,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPageState({...pageState, page: newPage});
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageState({
      ...pageState,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  if (!restockData.length) {
    return <NoData/>;
  }

  const emptyRows = pageState.rowsPerPage - Math.min(pageState.rowsPerPage,
    restockData.length - pageState.page * pageState.rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="RestockPurchasesTable"
            aria-label="restock purchases table"
          >
            <SortableTableHead
              order={pageState.order}
              orderBy={pageState.orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sort(restockData, {
                order: pageState.order,
                sortKey: (item) => item[pageState.orderBy],
              })
                .slice(
                  pageState.page * pageState.rowsPerPage,
                  pageState.page * pageState.rowsPerPage + pageState.rowsPerPage,
                )
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
          rowsPerPage={pageState.rowsPerPage}
          page={pageState.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.tablePagination}
        />
      </Paper>
    </div>
  );
};

export default RestockPurchasesTable;
