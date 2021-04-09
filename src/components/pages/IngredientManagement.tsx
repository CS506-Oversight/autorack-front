import React from 'react';

import Grid from '@material-ui/core/Grid';

import {FetchStatus} from '../../api/definitions/misc';
import AppValues from '../../const/values';
import {alertDispatchers} from '../../state/alert/dispatchers';
import {defaultMeasure, IngredientData} from '../../state/ingredient/data';
import {ingredientDispatchers} from '../../state/ingredient/dispatchers';
import {useIngredientSelector} from '../../state/ingredient/selector';
import {useDispatch} from '../../state/store';
import {IngredientForm} from '../elements/ingredient/Form';
import {UISelect} from '../elements/ui/Select';

const newIngredientSentinel = {
  id: 'new',
  name: '',
  measure: defaultMeasure,
  unit: 0.0,
  unitPrice: 0.0,
};

type IngredientInForm = {
  options: Array<IngredientData>,
  onForm: IngredientData,
  selected: IngredientData,
}

export const IngredientManagement = () => {
  const dispatch = useDispatch();
  const ingredientState = useIngredientSelector();

  const [ingredient, setIngredient] = React.useState<IngredientInForm>({
    options: [
      {...newIngredientSentinel},
      ...ingredientState.ingredients,
    ],
    onForm: {...newIngredientSentinel},
    selected: {...newIngredientSentinel},
  });
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>({
    fetched: false,
    fetching: false,
  });

  // Load the ingredients if not yet do so or last fetch > threshold
  if (!ingredientState.ingredients.length || Date.now() - ingredientState.lastFetch > AppValues.DATA_EXPIRY_MS) {
    dispatch(ingredientDispatchers.loadIngredient())
      .catch((error) => {
        setFetchStatus({
          fetching: false,
          fetched: true,
        });
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      })
      .finally(() => {
        setFetchStatus({
          fetching: false,
          fetched: true,
        });
      });
  } else if (!fetchStatus.fetched) {
    setFetchStatus({
      ...fetchStatus,
      fetched: true,
    });
  }

  const reset = () => {
    // Refresh the options and reset the selected and onForm ingredients to be the new one
    setIngredient({
      options: [
        {...newIngredientSentinel},
        ...ingredientState.ingredients,
      ],
      onForm: {...newIngredientSentinel},
      selected: {...newIngredientSentinel},
    });
  };

  const onSubmit = () => {
    let action;

    if (ingredient.onForm.id === newIngredientSentinel.id) {
      // Handle new ingredient
      action = dispatch(ingredientDispatchers.addIngredient(ingredient.onForm))
        .then(() => {
          dispatch(alertDispatchers.showAlert({severity: 'success', message: 'Ingredient Added.'}));
          reset();
        });
    } else {
      // Handle update ingredient
      action = dispatch(ingredientDispatchers.updateIngredient(ingredient.onForm))
        .then(() => {
          dispatch(alertDispatchers.showAlert({severity: 'success', message: 'Ingredient Updated.'}));
          reset();
        });
    }

    // Catch error if any
    action
      .catch((error) => {
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      });
  };

  const onIngredientSelected = (selectedIngredient: IngredientData) => {
    setIngredient({
      ...ingredient,
      onForm: {...selectedIngredient},
      selected: selectedIngredient,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UISelect
          label="Ingredient to Add/Edit"
          value={ingredient.selected}
          options={ingredient.options}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(ingredient) => ingredient.id === newIngredientSentinel.id ? '(Add New)' : ingredient.name}
          onOptionSelected={onIngredientSelected}
        />
      </Grid>
      {
        fetchStatus.fetched &&
        <IngredientForm
          ingredient={ingredient.onForm}
          setIngredient={(data) => setIngredient({...ingredient, onForm: {...data}})}
          onSubmit={onSubmit}
        />
      }
    </Grid>
  );
};
