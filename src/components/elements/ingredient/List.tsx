import React from 'react';

import {Accordion, AccordionDetails, AccordionSummary, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Ingredient} from '../../../state/ingredient/data';
import UIButton from '../ui/Button';
import {IngredientForm} from './Form';

export type IngredientListProps = {
  ingredients: Array<Ingredient>,
  setIngredients: (newIngredientData: Ingredient, index: number) => void,
  onSubmit: () => void,
  onDelete: (index: number) => () => void,
}

const useStyles = makeStyles(
  {
    root: {
      width: '100vw',
      margin: '0 0.8rem',
    },
  },
);

export const IngredientList = ({ingredients, setIngredients, onSubmit, onDelete}: IngredientListProps) => {
  const classes = useStyles();

  return (
    <>
      {
        ingredients.map((ingredient, index) => {
          return (
            <Accordion key={index} className={classes.root}>
              <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                {ingredient.name || '(no name)'}
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <IngredientForm
                    ingredient={ingredient}
                    setIngredient={(data) => setIngredients(data, index)}
                  />
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
          disabled={
            ingredients.length === 0 ||
            ingredients.some((ingredient) => !ingredient.name || !ingredient.unit || !ingredient.unitPrice)
          }
          fullWidth
        />
      </Grid>
    </>
  );
};
