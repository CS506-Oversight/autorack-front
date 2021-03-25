import React from 'react';

import {useSelector} from 'react-redux';

import {ReduxState} from '../../state/state';

export const Authenticated = () => {
  const {user} = useSelector((state: ReduxState) => state.auth);

  return <h1>Hi, {user?.firstName}! You are authenticated!</h1>;
};
