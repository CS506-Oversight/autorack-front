import React from 'react';

import {Button, PropTypes, ButtonProps as MaterialButtonProps} from '@material-ui/core';
import {LinkProps} from 'react-router-dom';

type ButtonVariant = 'text' | 'outlined' | 'contained';

type ButtonProps = MaterialButtonProps & Partial<LinkProps> & {
  text: string,
  variant: ButtonVariant,
  color: PropTypes.Color,
}

const UIButton = (props: ButtonProps) => {
  return <Button fullWidth {...props}>{props.text}</Button>;
};

export default UIButton;
