import {useSelector} from 'react-redux';

import {ReduxState} from '../state';

export const useIngredientSelector = () => {
  return useSelector((state: ReduxState) => state.ingredient);
};
