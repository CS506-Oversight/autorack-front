import React from 'react';

import {Autocomplete} from '@material-ui/lab';

import UIInput from './Input';

type UISelectProps<T> = {
  label: string,
  value: T,
  options: Array<T>,
  getOptionLabel: (option: T) => string,
  onOptionSelected: (option: T) => void,
};

export const UISelect = <T, >({label, value, options, getOptionLabel, onOptionSelected}: UISelectProps<T>) => {
  return (
    <Autocomplete
      value={value}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={(_, option) => {
        if (!option) {
          return;
        }
        onOptionSelected(option);
      }}
      renderInput={(params) => <UIInput {...params} label={label}/>}
    />
  );
};
