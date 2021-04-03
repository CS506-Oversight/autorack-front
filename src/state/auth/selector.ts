import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useAuthSelector = () => {
  return useSelector((state: ReduxState) => state.auth);
};
