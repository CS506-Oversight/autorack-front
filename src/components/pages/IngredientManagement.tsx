import React from 'react';

import Grid from '@material-ui/core/Grid';

import {FetchStatus} from '../../api/definitions/misc';
import AppValues from '../../const/values';
import {alertDispatchers} from '../../state/alert/dispatchers';
import {defaultMeasure, IngredientData} from '../../state/ingredient/data';
import {ingredientDispatchers} from '../../state/ingredient/dispatchers';
import {useIngredientSelector} from '../../state/ingredient/selector';
import {useDispatch} from '../../state/store';
import {IngredientList} from '../elements/ingredient/List';
import {UISelect} from '../elements/ui/Select';

const sentinelNewIngredient = {
  id: 'new',
  name: '',
  measure: defaultMeasure,
  unit: 0.0,
  unitPrice: 0.0,
};

type IngredientsInForm = {
  options: Array<IngredientData>,
  onForm: Array<IngredientData>,
  selected: IngredientData,
}

export const IngredientManagement = () => {
  const dispatch = useDispatch();
  const ingredientState = useIngredientSelector();

  const [ingredients, setIngredients] = React.useState<IngredientsInForm>({
    options: [
      {...sentinelNewIngredient},
      ...ingredientState.ingredients,
    ],
    onForm: [],
    selected: {...sentinelNewIngredient},
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
    setIngredients({
      options: [
        {...sentinelNewIngredient},
        ...ingredientState.ingredients,
      ],
      onForm: [],
      selected: {...sentinelNewIngredient},
    });
  };

  const onSubmit = () => {
    let action;

    if (ingredients.onForm[0].id === sentinelNewIngredient.id) {
      // Handle new ingredients
      action = dispatch(ingredientDispatchers.addIngredient(ingredients.onForm[0]))
        .then(() => {
          dispatch(alertDispatchers.showAlert({severity: 'success', message: 'Ingredient Added.'}));
          reset();
        });
    } else {
      // Handle update ingredients
      action = dispatch(ingredientDispatchers.updateIngredient(ingredients.onForm[0]))
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

  const onDelete = (index: number) => () => {
    ingredients.onForm.splice(index, 1);

    setIngredients({
      ...ingredients,
    });
  };

  const onIngredientSelected = (selectedIngredient: IngredientData) => {
    if (
      selectedIngredient.id !== sentinelNewIngredient.id &&
      ingredients.onForm.some((ingredient) => ingredient.id === selectedIngredient.id)
    ) {
      // Only change the selected option because the selected one is already queued
      setIngredients({
        ...ingredients,
        selected: selectedIngredient,
      });
      return;
    }

    setIngredients({
      ...ingredients,
      onForm: ingredients.onForm.concat({...selectedIngredient}),
      selected: selectedIngredient,
    });
  };

  const onListSetIngredient = (ingredientData: IngredientData, index: number) => {
    const newOnForm = [...ingredients.onForm];

    newOnForm[index] = ingredientData;

    setIngredients({
      ...ingredients,
      onForm: newOnForm,
    });
  };

  // TODO: Clear the select value right after the user selected an ingredient (currently users need to focus out)

  // Force set `UISelect` value to `null` to clear it everytime the element being unfocused
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UISelect
          label="Ingredient to Add/Edit"
          value={null}
          options={ingredients.options}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.id === sentinelNewIngredient.id ? '(Add New)' : option.name}
          getOptionDisabled={(option) => ingredients.onForm.some((ingredient) => ingredient.id === option.id)}
          onOptionSelected={onIngredientSelected}
        />
      </Grid>
      {
        fetchStatus.fetched &&
        <IngredientList
          ingredients={ingredients.onForm}
          setIngredients={onListSetIngredient}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      }
    </Grid>
  );
};
