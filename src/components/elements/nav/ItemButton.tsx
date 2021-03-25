import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';

import {useDispatch} from '../../../state/store';
import UIButton from '../ui/Button';
import {NavItemEntry} from './Items';

const useStyles = makeStyles(() => ({
  menuButton: {
    padding: '0.3rem 1rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '1.2rem',
    margin: '0 0.2rem',
    whiteSpace: 'nowrap', // No line break
  },
}));


export type NavItemButtonProps = {
  navItem: NavItemEntry,
  onClickHook?: React.MouseEventHandler,
}


export const NavItemButton = ({navItem, onClickHook}: NavItemButtonProps) => {
  const style = useStyles();
  const dispatch = useDispatch();

  const onButtonClicked = (e: React.MouseEvent) => {
    if (onClickHook) {
      onClickHook(e);
    }

    if (navItem.onClick) {
      navItem.onClick(e, dispatch);
    }
  };

  return (
    <UIButton
      className={style.menuButton}
      color={navItem.buttonColor || 'inherit'}
      variant={navItem.buttonVariant || 'text'}
      text={navItem.label}
      key={navItem.label}
      to={navItem.link}
      onClick={onButtonClicked}
      component={RouterLink}
    />
  );
};

type NavbarButtonsProps = {
  fnGetItems: () => Array<NavItemEntry>,
  onClickHook?: React.MouseEventHandler,
  className?: string,
}

export const NavbarButtons = ({fnGetItems, onClickHook, className}: NavbarButtonsProps) => {
  return (
    <div className={className}>
      {
        fnGetItems()
          .map((navItem) => (
            <NavItemButton onClickHook={onClickHook} navItem={navItem} key={navItem.label}/>
          ))
      }
    </div>
  );
};
