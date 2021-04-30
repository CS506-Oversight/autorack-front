import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useInventorySelector = () => {
  return useSelector((state: ReduxState) => state.inventory);
};
