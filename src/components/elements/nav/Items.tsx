import React from 'react';

import {PropTypes} from '@material-ui/core';

import AppPaths from '../../../const/paths';
import {authDispatchers} from '../../../state/auth/dispatchers';
import {Dispatcher} from '../../../state/store';
import {ButtonVariant} from '../ui/Button';

export type NavItemEntry = {
  label: string,
  link: string,
  displayWhenLoggedIn: boolean,
  displayWhenAnonymous: boolean,
  buttonColor?: PropTypes.Color,
  buttonVariant?: ButtonVariant,
  onClick?: (e: React.MouseEvent, dispatch: Dispatcher) => void,
}

/**
 * Navigation entry items.
 *
 * **Do not directly get the items using this.**
 * Use either one of the methods below to get the desired items.
 *
 * - {@link getFilteredNavItems}: Get the nav items using the given condition.
 * - {@link getLoggedInOnlyNavItems}: Get the nav items to be shown only when the user is authenticated.
 * - {@link getAnonymousOnlyNavItems}: Get the nav items to be shown only when the user is anonymous.
 */
const navBarItems: Array<NavItemEntry> = [
  {
    label: 'Login',
    link: AppPaths.SIGN_IN,
    displayWhenLoggedIn: false,
    displayWhenAnonymous: true,
  },
  {
    label: 'Sign Up',
    link: AppPaths.SIGN_UP,
    displayWhenLoggedIn: false,
    displayWhenAnonymous: true,
  },
  {
    label: 'Sign Out',
    link: AppPaths.HOME,
    buttonVariant: 'outlined',
    displayWhenLoggedIn: true,
    displayWhenAnonymous: false,
    onClick: (e, dispatch) => dispatch(authDispatchers.signOut()),
  },
];

export const getFilteredNavItems = (filter: (navItem: NavItemEntry) => boolean) => {
  return navBarItems.filter(filter);
};

export const getLoggedInOnlyNavItems = () => {
  return getFilteredNavItems((navItem) => navItem.displayWhenLoggedIn);
};

export const getAnonymousOnlyNavItems = () => {
  return getFilteredNavItems((navItem) => navItem.displayWhenAnonymous);
};
