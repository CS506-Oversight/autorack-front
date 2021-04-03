import React from 'react';

import {Redirect, Route} from 'react-router-dom';

import AppPaths from '../../../const/paths';
import {User} from '../../../state/auth/data';
import {useAuthSelector} from '../../../state/auth/selector';
import {RouteCommonProps} from './props';

type PublicRouteProps = RouteCommonProps;

const renderRoute = (user: User | null, {children}: React.PropsWithChildren<PublicRouteProps>) => () => {
  if (user != null) { // `==` for checking `null` or `undefined`
    return <Redirect to={AppPaths.AUTHENTICATED}/>;
  }

  return children;
};

export const PublicRoute = (props: React.PropsWithChildren<PublicRouteProps>) => {
  // Do not move this `useSelector` inside `renderRoute`, it causes an invalid use of hook
  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  const {user} = useAuthSelector();

  return (
    <Route exact path={props.path} render={renderRoute(user, props)}/>
  );
};
