import React from 'react';

import Grid from '@material-ui/core/Grid';
import {AsyncThunk, unwrapResult} from '@reduxjs/toolkit';

import {FetchStatus} from '../../../../api/definitions/misc';
import AppValues from '../../../../const/values';
import {alertDispatchers} from '../../../../state/alert/dispatchers';
import {SynchronizedState} from '../../../../state/base';
import {NamedData} from '../../../../state/base/data';
import {UpsertListPayload} from '../../../../state/base/payload';
import {useDispatch} from '../../../../state/store';
import {UISelect} from '../../../elements/ui/Select';
import {ManagementFormState} from './type';


type ItemManagementProps<T extends NamedData, S extends SynchronizedState> = {
  newItemSentinel: T
  initialOptions: Array<T>,
  initialState: S,
  loadDispatcher: AsyncThunk<Array<T>, void, {}>,
  upsertDispatcher: AsyncThunk<Array<T>, UpsertListPayload<T>, {}>,
  getInitialStateItems: (state: S) => Array<T>,
  messageOnSuccess: string,
  selectLabel: string,
  renderItemList: (
    managementState: ManagementFormState<T>,
    setItemByIndex: (item: T, index: number) => void,
    onSubmit: () => void,
    onDelete: (index: number) => () => void,
  ) => React.ReactNode,
}


export const ItemManagement = <T extends NamedData, S extends SynchronizedState>(
  props: ItemManagementProps<T, S>,
) => {
  const {
    newItemSentinel,
    initialOptions,
    initialState,
    loadDispatcher,
    upsertDispatcher,
    getInitialStateItems,
    messageOnSuccess,
    selectLabel,
    renderItemList,
  } = props;

  const dispatch = useDispatch();

  const [managementState, setManagementState] = React.useState<ManagementFormState<T>>({
    options: [{...newItemSentinel}, ...initialOptions],
    onForm: [],
    selected: {...newItemSentinel},
  });
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>({
    fetched: false,
    fetching: false,
  });

  // Load the managementState if not yet do so or last fetch > threshold
  if (!initialOptions.length || Date.now() - initialState.lastFetch > AppValues.DATA_EXPIRY_MS) {
    dispatch(loadDispatcher())
      .then(unwrapResult)
      .then((loadedItems) => reset(loadedItems))
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

  const reset = (options: Array<T>) => {
    // Refresh the options and reset the selected and onForm managementState to be the new one
    setManagementState({
      options: [
        {...newItemSentinel},
        ...options,
      ],
      onForm: [],
      selected: {...newItemSentinel},
    });
  };

  const onSubmit = () => {
    dispatch(upsertDispatcher({
      original: getInitialStateItems(initialState),
      updated: managementState.onForm,
    }))
      .then(unwrapResult)
      .then((options) => {
        dispatch(alertDispatchers.showAlert({severity: 'success', message: messageOnSuccess}));
        reset(options);
      })
      .catch((error) => {
        dispatch(alertDispatchers.showAlert({severity: 'error', message: error.message}));
      });
  };

  const onDelete = (index: number) => () => {
    managementState.onForm.splice(index, 1);

    setManagementState({
      ...managementState,
    });
  };

  const onIngredientSelected = (selected: T) => {
    if (
      selected.id !== newItemSentinel.id &&
      managementState.onForm.some((item) => item.id === selected.id)
    ) {
      // Only change the selected option because the selected one is already queued
      setManagementState({
        ...managementState,
        selected: selected,
      });
      return;
    }

    setManagementState({
      ...managementState,
      onForm: managementState.onForm.concat({...selected}),
      selected: selected,
    });
  };

  const onListSetIngredient = (item: T, index: number) => {
    const newOnForm = [...managementState.onForm];

    newOnForm[index] = item;

    setManagementState({
      ...managementState,
      onForm: newOnForm,
    });
  };

  // TODO: Clear the select value right after the user selected an ingredient (currently users need to focus out)

  // Force set `UISelect` value to `null` to clear it everytime the element being unfocused
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UISelect
          label={selectLabel}
          value={null}
          options={managementState.options}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.id === newItemSentinel.id ? '(Add New)' : option.name}
          getOptionDisabled={(option) => (
            option.id !== newItemSentinel.id &&
            managementState.onForm.some((ingredient) => ingredient.id === option.id)
          )}
          onOptionSelected={onIngredientSelected}
          disabled={fetchStatus.fetching}
        />
      </Grid>
      {
        fetchStatus.fetched &&
        renderItemList(managementState, onListSetIngredient, onSubmit, onDelete)
      }
    </Grid>
  );
};
