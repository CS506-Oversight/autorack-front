import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {ItemDataInfo} from '../../../state/restock/restockData';
import PurchaseOverview from './PurchaseOverview';

/**
 * TODO: CHECK W/ TEAM TO SEE IF CODE NEEDS REFACTORING
 */

type PurchaseModelProps = {
    data: Array<ItemDataInfo>;
    orderId: string;
}

const PurchaseModal = ({data, orderId}: PurchaseModelProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
          More Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xl'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Order #${orderId}`}</DialogTitle>
        <DialogContent>
          <PurchaseOverview data={data}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PurchaseModal;
