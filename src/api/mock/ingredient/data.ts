import {Ingredient, measureData} from '../../../state/ingredient/data';

export const dummyIngredientData: Array<Ingredient> = [
  {
    id: 'axpeax',
    name: 'sample ingredient',
    measure: measureData.ml,
    currentStock: 10,
    currentStockEquivalent: 10 * measureData.ml.equivalentMetric,
    capacity: 50,
    capacityMeasure: measureData.ml,
    capacityEquivalent: 50 * measureData.ml.equivalentMetric,
  },
  {
    id: 'axpeay',
    name: 'sample ingredient 2',
    measure: measureData.g,
    currentStock: 5,
    currentStockEquivalent: 5 * measureData.g.equivalentMetric,
    capacity: 70,
    capacityMeasure: measureData.g,
    capacityEquivalent: 70 * measureData.g.equivalentMetric,
  },
  {
    id: 'axpeaz',
    name: 'sample ingredient 3',
    measure: measureData.tbsp,
    currentStock: 1,
    currentStockEquivalent: measureData.tbsp.equivalentMetric,
    capacity: 90,
    capacityMeasure: measureData.tbsp,
    capacityEquivalent: 90 * measureData.tbsp.equivalentMetric,
  },
];
