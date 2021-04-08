import React from 'react';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import {PurchaseItemInfo} from '../../../../api/definitions/restock/data';
import {sumValues} from '../../../../utils/misc';
import {PurchaseOverviewData} from './OverviewData';
import {PurchaseOverviewHeader} from './OverviewHeader';
import {PurchaseOverviewSummary} from './OverviewSummary';


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

type PurchaseOverviewProps = {
  data: Array<PurchaseItemInfo>;
}

const PurchaseOverview = ({data}: PurchaseOverviewProps) => {
  const classes = useStyles();

  const formatCurrency = (num: number) => {
    return `${num.toFixed(2)}`;
  };

  const calculatedData = data.map((elem) => {
    return {
      description: elem.description,
      quantity: elem.quantity,
      unitPrice: elem.unitPrice,
      price: elem.quantity * elem.unitPrice,
    };
  });

  const invoiceSubtotal = sumValues(calculatedData.map((elem) => elem.price));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="restock purchase overview">
        <PurchaseOverviewHeader/>
        <TableBody>
          <PurchaseOverviewData currencyFormatter={formatCurrency} data={calculatedData}/>
          <PurchaseOverviewSummary currencyFormatter={formatCurrency} subtotal={invoiceSubtotal}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseOverview;
