import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

type RestockEmptyRowsProps = {
  count: number;
}

export const RestockEmptyRows = ({count}: RestockEmptyRowsProps) => {
  if (!count) {
    return <></>;
  }

  return (
    <TableRow style={{height: 53 * count}}>
      <TableCell colSpan={6}/>
    </TableRow>
  );
};
