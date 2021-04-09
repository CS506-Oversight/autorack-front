import React from 'react';

import {Autocomplete} from '@material-ui/lab';

import UIInput from './Input';

type UISelectProps<T> = {
  label: string,
  value: T | null,
  options: Array<T>,
  getOptionLabel: (option: T) => string,
  getOptionSelected?: (option: T, value: T) => boolean,
  getOptionDisabled?: (option: T) => boolean,
  onOptionSelected: (option: T) => void,
  name?: string,
};

export const UISelect = <T, >(props: UISelectProps<T>) => {
  const {label, value, options, getOptionLabel, getOptionSelected, getOptionDisabled, onOptionSelected} = props;

  return (
    <Autocomplete
      value={value}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      getOptionDisabled={getOptionDisabled}
      onChange={(_, option) => {
        if (!option) {
          return;
        }
        onOptionSelected(option);
      }}
      renderInput={(params) => {
        return <UIInput {...params} label={label}/>;
      }}
    />
  );
};
