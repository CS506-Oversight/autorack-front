import {Button, PropTypes} from '@material-ui/core';
import React, {ButtonHTMLAttributes} from 'react';

type ButtonVariant = 'text' | 'outlined' | 'contained';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string,
  variant: ButtonVariant,
  color: PropTypes.Color,
}

const UIButton = (props: ButtonProps) => {
  return <Button fullWidth {...props}>{props.text}</Button>;
};

export default UIButton;
