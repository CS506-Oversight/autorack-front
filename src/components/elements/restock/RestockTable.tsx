import React from 'react';

import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';

import {FetchStatus} from '../../../api/definitions/misc';
import ApiPaths from '../../../api/definitions/paths';
import {RestockData, RestockInfo} from '../../../api/definitions/restock/data';
import {alertDispatchers} from '../../../state/alert/dispatchers';
import {useAuthSelector} from '../../../state/auth/selector';
import {useDispatch} from '../../../state/store';
import {Order} from '../../../utils/sort';
import {NoData} from '../table/NoData';
import SortableTableHeader, {SortableTableHeaderCell} from '../table/SortableTableHeader';
import {RestockEmptyRows} from './RestockEmptyRows';
import {RestockEntries} from './RestockEntries';

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

const headCells: Array<SortableTableHeaderCell<keyof RestockInfo>> = [
  {columnName: 'id', numeric: false, label: 'Order #'},
  {columnName: 'purchaseDate', numeric: false, label: 'Purchase Date'},
  {columnName: 'status', numeric: false, label: 'Status'},
  {columnName: 'type', numeric: false, label: 'Type'},
  {columnName: 'totalPrice', numeric: true, label: 'Total Price ($)'},
];

export type PageState = {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof RestockInfo;
}

const RestockTable = () => {
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

  const {user} = useAuthSelector();

  const fetchData = async () => {
    const id = user?.id;
    await axios.get(ApiPaths.RESTOCK_PURCHASES + `?user_id=${id}`)
      .then((response) => {
        setRestockData({
          ...restockData,
          fetched: true,
          fetching: false,
          response: response.data.data,
        });
      })
      .catch((error) =>{
        setRestockData({
          ...restockData,
          fetched: true,
          fetching: false,
          error: error.message,
        });
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      });
  };

  if (!restockData.fetched) {
    fetchData();
  }

  const onHeaderSort = (event: React.MouseEvent<HTMLSpanElement>, columnName: keyof RestockInfo) => {
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
              <RestockEntries data={restockData.response} pageState={pageState}/>
              <RestockEmptyRows count={emptyRows}/>
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

export default RestockTable;
