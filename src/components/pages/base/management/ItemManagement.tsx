import React, {useEffect} from 'react';

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


// https://stackoverflow.com/a/51412935/11571888
type ItemManagementConstituent<T extends NamedData> = {
  newItemSentinel: T,
  upsertDispatcher: AsyncThunk<Array<T>, UpsertListPayload<T>, {}>,
  messageOnSuccess: string,
} | {
  newItemSentinel?: never,
  upsertDispatcher?: never,
  messageOnSuccess?: never,
}


type ItemManagementProps<T extends NamedData, S extends SynchronizedState> = ItemManagementConstituent<T> & {
  initialOptions: Array<T>,
  initialState: S,
  loadDispatcher: AsyncThunk<Array<T>, void, {}>,
  getInitialStateItems: (state: S) => Array<T>,
  selectLabel: string,
  renderItemList: (
    managementState: ManagementFormState<T>,
    setItemByIndex: (item: T, index: number) => void,
    onDelete: (index: number) => () => void,
    onSubmit: () => void,
  ) => React.ReactNode,
  useManagementState?: [ManagementFormState<T>, (newState: ManagementFormState<T>) => void],
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
    useManagementState,
  } = props;

  const dispatch = useDispatch();

  const getOptions = (options: Array<T>) => {
    return [...(newItemSentinel ? [{...newItemSentinel}] : []), ...options];
  };

  const [managementState, setManagementState] = useManagementState ?? React.useState<ManagementFormState<T>>({
    options: getOptions(initialOptions),
    onForm: [],
  });
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>({
    fetched: false,
    fetching: false,
  });

  useEffect(() => {
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
  }, []);


  const reset = (options: Array<T>) => {
    // Refresh the options and reset the selected and onForm managementState to be the new one
    setManagementState({
      options: getOptions(options),
      onForm: [],
    });
  };

  const onSubmit = () => {
    if (!upsertDispatcher) {
      return;
    }

    dispatch(upsertDispatcher({
      original: getInitialStateItems(initialState),
      updated: managementState.onForm,
    }))
      .then(unwrapResult)
      .then((options) => {
        dispatch(alertDispatchers.showAlert({
          severity: 'success',
          message: messageOnSuccess || 'Update action succeed.',
        }));
        reset(options);
      })
      .catch((error) => {
        dispatch(alertDispatchers.showAlert({
          severity: 'error',
          message: error.message,
        }));
      });
  };

  const onDelete = (deletedIndex: number) => () => {
    setManagementState({
      ...managementState,
      onForm: managementState.onForm.filter((_, index) => index !== deletedIndex),
    });
  };

  const onIngredientSelected = (selected: T) => {
    setManagementState({
      ...managementState,
      onForm: managementState.onForm.concat({...selected}),
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
          getOptionLabel={(option) => option.id === newItemSentinel?.id ? '(Add New)' : option.name}
          getOptionDisabled={(option) => (
            option.id !== newItemSentinel?.id &&
            managementState.onForm.some((ingredient) => ingredient.id === option.id)
          )}
          onOptionSelected={onIngredientSelected}
          disabled={fetchStatus.fetching}
        />
      </Grid>
      {
        fetchStatus.fetched &&
        renderItemList(managementState, onListSetIngredient, onDelete, onSubmit)
      }
    </Grid>
  );
};
