import React from 'react';

import {Redirect, Route} from 'react-router-dom';

import AppPaths from '../../../const/paths';
import {User} from '../../../state/auth/data';
import {useAuthSelector} from '../../../state/auth/selector';
import {RouteCommonProps} from './props';

type UnauthedRouteProps = RouteCommonProps;

const renderRoute = (user: User | null, {children}: React.PropsWithChildren<UnauthedRouteProps>) => () => {
  if (user != null) { // `==` for checking `null` or `undefined`
    return <Redirect to={AppPaths.AUTHENTICATED}/>;
  }

  return children;
};

export const AnonymousRoute = (props: React.PropsWithChildren<UnauthedRouteProps>) => {
  // Do not move this `useSelector` inside `renderRoute`, it causes an invalid use of hook
  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  const {user} = useAuthSelector();

  return (
    <Route exact path={props.path} render={renderRoute(user, props)}/>
  );
};
