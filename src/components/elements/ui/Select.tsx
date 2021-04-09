import React from 'react';

import {Autocomplete} from '@material-ui/lab';

import UIInput from './Input';

type UISelectProps<T> = {
  label: string,
  value: T,
  options: Array<T>,
  getOptionLabel: (option: T) => string,
  getOptionSelected?: (option: T, value: T) => boolean,
  onOptionSelected: (option: T) => void,
  name?: string,
};

export const UISelect = <T, >(props: UISelectProps<T>) => {
  const {label, value, options, getOptionLabel, getOptionSelected, onOptionSelected} = props;

  return (
    <Autocomplete
      value={value}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
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
