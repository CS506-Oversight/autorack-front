import React from 'react';

import TextField, {TextFieldProps} from '@material-ui/core/TextField';

export type InputProps = TextFieldProps & {
  // Shorthand property for `onChange`
  onValueChanged?: (newValue: string) => void,
};

const UIInput = ({onChange, onValueChanged, required, value, ...props}: InputProps) => {
  // https://stackoverflow.com/a/50196327/11571888 for the reason of such expansion
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onValueChanged?.(e.target.value);
  };

  return (
    <TextField
      // Force the component to be a controlled input
      // If `value || ''` and `value` = 0, the input value will be an empty string instead of `0`.
      // Therefore, we are checking explicit `undefined` here.
      value={value !== undefined ? value : ''}
      variant="outlined"
      margin="normal"
      fullWidth
      required={required || true}
      onChange={onChangeHandler}
      {...props}
    />
  );
};

export default UIInput;
