import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useRestockSelector = () => {
  return useSelector((state: ReduxState) => state.restock);
};
