import {Ingredient, measureData} from '../../../state/ingredient/data';

export const dummyIngredientData: Array<Ingredient> = [
  {
    id: 'axpeax',
    name: 'sample ingredient',
    measure: measureData.ml,
    currentStock: 10,
    capacity: 50,
  },
  {
    id: 'axpeay',
    name: 'sample ingredient 2',
    measure: measureData.g,
    currentStock: 5,
    capacity: 70,
  },
  {
    id: 'axpeaz',
    name: 'sample ingredient 3',
    measure: measureData.tbsp,
    currentStock: 1,
    capacity: 90,
  },
];
