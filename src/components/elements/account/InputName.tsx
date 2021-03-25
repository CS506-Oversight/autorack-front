import React from 'react';

import Grid from '@material-ui/core/Grid';

import UIInput from '../ui/Input';

export type InputNameProps = {
  firstValue: string,
  firstOnChanged: (newValue: string) => void,
  lastValue: string,
  lastOnChanged: (newValue: string) => void,
  firstName?: string,
  firstPlaceholder?: string,
  firstLabel?: string,
  lastName?: string,
  lastPlaceholder?: string,
  lastLabel?: string,
}

export const InputName = (props: InputNameProps) => {
  const {
    firstValue,
    firstOnChanged,
    lastValue,
    lastOnChanged,
    firstName = 'firstName',
    firstPlaceholder = 'First Name',
    firstLabel = 'First Name',
    lastName = 'lastName',
    lastPlaceholder = 'Last Name',
    lastLabel = 'Last Name',
  } = props;

  return (
    <>
      <Grid item xs={12} sm={6}>
        <UIInput
          name={firstName}
          value={firstValue}
          onValueChanged={firstOnChanged}
          placeholder={firstPlaceholder}
          label={firstLabel}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <UIInput
          name={lastName}
          value={lastValue}
          onValueChanged={lastOnChanged}
          placeholder={lastPlaceholder}
          label={lastLabel}
        />
      </Grid>
    </>
  );
};
