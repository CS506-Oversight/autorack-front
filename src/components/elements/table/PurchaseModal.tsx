import React from 'react';

// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {ItemDataInfo} from '../../../api/definitions/restock/data';
import UIButton from '../ui/Button';
import PurchaseOverview from './PurchaseOverview';


type PurchaseModelProps = {
    data: Array<ItemDataInfo>;
    orderId: string;
}

const PurchaseModal = ({data, orderId}: PurchaseModelProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <UIButton
        color="primary"
        onClick={() => setOpen(true)}
        text='More Details'
        variant='text'
        fullWidth={false}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='xl'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Order #${orderId}`}</DialogTitle>
        <DialogContent>
          <PurchaseOverview data={data}/>
        </DialogContent>
        <DialogActions>
          <UIButton
            onClick={() => setOpen(false)}
            color='primary'
            text='Back'
            variant='text'
            fullWidth={false}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PurchaseModal;
