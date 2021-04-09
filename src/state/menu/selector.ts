import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useMenuSelector = () => {
  return useSelector((state: ReduxState) => state.menu);
};
