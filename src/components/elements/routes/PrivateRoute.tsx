import React from 'react';

import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

import AppPaths from '../../../const/paths';
import {User} from '../../../state/auth/data';
import {ReduxState} from '../../../state/state';
import {RouteCommonProps} from './props';

type PrivateRouteProps = RouteCommonProps;

const renderRoute = (user: User | null, {children, path}: React.PropsWithChildren<PrivateRouteProps>) => () => {
  console.log(`Private ${user != null} @ ${path}`);

  if (user == null) { // `==` for checking `null` or `undefined`
    return <Redirect to={AppPaths.SIGN_IN}/>;
  }

  return children;
};

export const PrivateRoute = (props: React.PropsWithChildren<PrivateRouteProps>) => {
  // Do not move this `useSelector` inside `renderRoute`, it causes an invalid use of hook
  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  const {user} = useSelector((state: ReduxState) => state.auth);

  return (
    <Route exact path={props.path} render={renderRoute(user, props)}/>
  );
};
