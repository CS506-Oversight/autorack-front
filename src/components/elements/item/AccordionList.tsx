import React from 'react';

import {Accordion, AccordionDetails, AccordionSummary, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import UIButton from '../ui/Button';

const useStyles = makeStyles(
  {
    root: {
      width: '100vw',
      margin: '0 0.8rem',
    },
  },
);

export type AccordionListProps<T> = {
  items: Array<T>,
  setItemByIndex: (newItemData: T, index: number) => void,
  onSubmit: () => void,
  onDelete: (index: number) => () => void,
  isItemIncomplete: (item: T) => boolean,
  getAccordionTitle: (item: T) => string,
  renderItemForm: (
    item: T,
    setItem: (item: T) => void,
  ) => React.ReactNode,
}

export const AccordionList = <T, >({
  items,
  setItemByIndex,
  onSubmit,
  onDelete,
  isItemIncomplete,
  getAccordionTitle,
  renderItemForm,
}: AccordionListProps<T>) => {
  const classes = useStyles();

  return (
    <>
      {
        items.map((item, index) => {
          return (
            <Accordion key={index} className={classes.root}>
              <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                {getAccordionTitle(item)}
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {renderItemForm(item, (data) => setItemByIndex(data, index))}
                  <Grid item xs={12}>
                    <UIButton text="Delete" variant="outlined" color="primary" onClick={onDelete(index)}/>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })
      }
      <Grid item xs={12}>
        <UIButton
          text="Submit"
          color="primary"
          variant="contained"
          name="submit"
          onClick={() => onSubmit()}
          disabled={items.length === 0 || items.some((item) => isItemIncomplete(item))}
          fullWidth
        />
      </Grid>
    </>
  );
};
