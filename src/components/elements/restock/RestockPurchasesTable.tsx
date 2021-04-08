import React from 'react';

import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {FetchStatus} from '../../../api/definitions/misc';
import {RestockData, RestockItemInfo} from '../../../api/definitions/restock/data';
import {RestockStatusType} from '../../../api/definitions/restock/data';
import {mockFetchRestockData} from '../../../api/mock/restock/utils';
import {alertDispatchers} from '../../../state/alert/dispatchers';
import {useDispatch} from '../../../state/store';
import {Order, sort} from '../../../utils/sort';
import {NoData} from '../table/NoData';
import SortableTableHeader, {SortableTableHeaderCell} from '../table/SortableTableHeader';
import Status, {StatusColor} from '../ui/Status';
import PurchaseModal from './PurchaseModal';

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

const statusColorMap: {[key in RestockStatusType]: StatusColor} = {
  completed: 'success',
  processing: 'info',
  shipped: 'error',
};

const headCells: Array<SortableTableHeaderCell<keyof RestockItemInfo>> = [
  {columnName: 'id', numeric: false, label: 'Order #'},
  {columnName: 'purchaseDate', numeric: false, label: 'Purchase Date'},
  {columnName: 'status', numeric: false, label: 'Status'},
  {columnName: 'type', numeric: false, label: 'Type'},
  {columnName: 'totalPrice', numeric: true, label: 'Total Price ($)'},
];

type PageState = {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof RestockItemInfo;
}

const RestockPurchasesTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [restockData, setRestockData] = React.useState<FetchStatus<RestockData>>({
    fetched: false,
    fetching: false,
  });
  const [pageState, setPageState] = React.useState<PageState>({
    page: 0,
    rowsPerPage: 10,
    order: 'asc',
    orderBy: 'id',
  });

  if (!restockData.fetched) {
    mockFetchRestockData()
      .then((data) => {
        setRestockData({
          ...restockData,
          fetched: true,
          fetching: false,
          response: data,
        });
      })
      .catch((error) => {
        setRestockData({
          ...restockData,
          fetched: true,
          fetching: false,
          error: error.message,
        });
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      });
  }

  const onHeaderSort = (event: React.MouseEvent<HTMLSpanElement>, columnName: keyof RestockItemInfo) => {
    const isAsc = pageState.orderBy === columnName && pageState.order === 'asc';
    setPageState({
      ...pageState,
      order: isAsc ? 'desc' : 'asc',
      orderBy: columnName,
    });
  };

  const onPageChanged = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPageState({...pageState, page: newPage});
  };

  const onRowsPerPageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageState({
      ...pageState,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  if (!restockData.response?.length) {
    return <NoData/>;
  }

  const emptyRows = pageState.rowsPerPage - Math.min(
    pageState.rowsPerPage,
    restockData.response.length - pageState.page * pageState.rowsPerPage,
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="RestockPurchasesTable"
            aria-label="restock purchases table"
          >
            <SortableTableHeader
              order={pageState.order}
              orderBy={pageState.orderBy}
              onSort={onHeaderSort}
              headCells={headCells}
              title="Purchase Info"
            />
            <TableBody>
              {sort(restockData.response, {
                order: pageState.order,
                sortKey: (item) => item[pageState.orderBy],
              })
                .slice(
                  pageState.page * pageState.rowsPerPage,
                  pageState.page * pageState.rowsPerPage + pageState.rowsPerPage,
                )
                .map((row) => {
                  return (
                    <TableRow
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
                          color={statusColorMap[row.status]}
                        />
                        {row.status}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.totalPrice}</TableCell>
                      <TableCell>
                        <PurchaseModal data={row.itemsData} orderId={row.id}/>
                      </TableCell>
                    </TableRow>
                  );
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
          count={restockData.response.length}
          rowsPerPage={pageState.rowsPerPage}
          page={pageState.page}
          onChangePage={onPageChanged}
          onChangeRowsPerPage={onRowsPerPageChanged}
          className={classes.tablePagination}
        />
      </Paper>
    </div>
  );
};

export default RestockPurchasesTable;
