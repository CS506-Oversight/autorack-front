import React from 'react';

import {Redirect, Route} from 'react-router-dom';

import AppValues from '../../../const/values';
import {User} from '../../../state/auth/data';
import {useAuthSelector} from '../../../state/auth/selector';
import {RouteCommonProps} from './props';

type AnonymousRouteProps = RouteCommonProps;

const renderRoute = (user: User | null, {children}: React.PropsWithChildren<AnonymousRouteProps>) => () => {
  if (user != null) { // `==` for checking `null` or `undefined`
    return <Redirect to={AppValues.TARGET_AUTHED_ON_ANONYMOUS}/>;
  }

  return children;
};

export const AnonymousRoute = (props: React.PropsWithChildren<AnonymousRouteProps>) => {
  // Do not move this `useSelector` inside `renderRoute`, it causes an invalid use of hook
  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  const {user} = useAuthSelector();

  return (
    <Route exact path={props.path} render={renderRoute(user, props)}/>
  );
};
