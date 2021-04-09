import {Ingredient, measureData} from '../../../state/ingredient/data';

export const dummyIngredientData: Array<Ingredient> = [
  {
    id: 'axpeax',
    name: 'sample ingredient',
    measure: measureData.ml,
    unit: 10,
    unitPrice: 87,
  },
  {
    id: 'axpeay',
    name: 'sample ingredient 2',
    measure: measureData.g,
    unit: 5,
    unitPrice: 78,
  },
  {
    id: 'axpeaz',
    name: 'sample ingredient 3',
    measure: measureData.tbsp,
    unit: 1,
    unitPrice: 6,
  },
];
