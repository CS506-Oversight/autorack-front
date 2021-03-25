import React from 'react';

import AppPaths from '../../../const/paths';
import {authDispatchers} from '../../../state/auth/dispatchers';
import {Dispatcher} from '../../../state/store';


export type NavItemEntry = {
  label: string,
  link: string,
  displayWhenLoggedIn: boolean,
  displayWhenAnonymous: boolean,
  onClick?: (dispatch: Dispatcher) => (e: React.MouseEvent) => void,
}


export const navBarItems: Array<NavItemEntry> = [
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
    link: AppPaths.SIGN_OUT,
    displayWhenLoggedIn: true,
    displayWhenAnonymous: false,
    onClick: (dispatch) => () => dispatch(authDispatchers.signOut()),
  },
];
