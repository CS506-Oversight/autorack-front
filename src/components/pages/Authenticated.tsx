import React from 'react';

import {useAuthSelector} from '../../state/auth/selector';

export const Authenticated = () => {
  const {user} = useAuthSelector();

  return <h1>Hi, {user?.firstName}! You are authenticated!</h1>;
};
