import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {RestockData, RestockStatusType} from '../../../api/definitions/restock/data';
import {sort} from '../../../utils/sort';
import Status, {StatusColor} from '../ui/Status';
import PurchaseModal from './purchase/Modal';
import {PageState} from './RestockTable';

type RestockEntriesProps = {
  data: RestockData,
  pageState: PageState,
}

const restockStatusColor: { [key in RestockStatusType]: StatusColor } = {
  completed: 'success',
  processing: 'info',
  shipped: 'error',
};

export const RestockEntries = ({data, pageState}: RestockEntriesProps) => {
  return (
    <>
      {
        sort(data, {
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
                    color={restockStatusColor[row.status]}
                  />
                  {row.status}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>
                  <PurchaseModal data={row.purchasedItems} orderId={row.id}/>
                </TableCell>
              </TableRow>
            );
          })
      }
    </>
  );
};
