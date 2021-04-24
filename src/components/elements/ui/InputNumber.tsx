import React from 'react';

import UIInput, {InputProps} from './Input';

export type InputNumberProps = Omit<InputProps, 'onValueChanged'> & {
  // Shorthand property for `onChange`
  onValueChanged?: (newValue: number) => void,
  isPositiveOnly?: boolean,
};

const UIInputNumber = ({
  value,
  onChange,
  onValueChanged,
  isPositiveOnly = false,
  ...props
}: InputNumberProps) => {
  // https://stackoverflow.com/a/50196327/11571888 for the reason of such expansion
  const onValueChangedInternal = (newValString: string) => {
    const newValue = +newValString;

    if (isNaN(newValue) || isPositiveOnly && newValue < 0) {
      return;
    }
    onValueChanged?.(newValue);
  };

  return <UIInput value={value} onValueChanged={onValueChangedInternal} {...props}/>;
};

export default UIInputNumber;
