import {Menu} from '../../../state/menu/data';
import {dummyIngredientData} from '../ingredient/data';

export const dummyMenuData: Array<Menu> = [
  {
    id: 'fack',
    name: 'menu 1',
    description: 'I am menu 1',
    ingredients: [dummyIngredientData[0], dummyIngredientData[1]],
  },
  {
    id: 'shet',
    name: 'menu 2',
    description: 'I am menu 2',
    ingredients: [dummyIngredientData[2]],
  },
];
