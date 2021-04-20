import {Ingredient, measureData} from '../../../state/ingredient/data';

export const dummyIngredientData: Array<Ingredient> = [
  {
    id: 'axpeax',
    name: 'sample ingredient',
    measure: measureData.ml,
    unit: 10,
    currentStock: 87,
  },
  {
    id: 'axpeay',
    name: 'sample ingredient 2',
    measure: measureData.g,
    unit: 5,
    currentStock: 78,
  },
  {
    id: 'axpeaz',
    name: 'sample ingredient 3',
    measure: measureData.tbsp,
    unit: 1,
    currentStock: 6,
  },
];
