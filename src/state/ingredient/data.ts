import {NamedData} from '../base/data';

export enum MeasureType {
  VOLUME,
  MASS,
}

export type Measure = {
  name: string,
  type: MeasureType,
  // `L` for volume; `g` for mass
  equivalentMetric: number,
}

export enum VolumeMeasure {
  ML = 'ml',
  TBSP = 'tbsp',
  CUP = 'cup',
  FL_OZ = 'fl. oz',
}

export const volumeMeasureData: { [key in VolumeMeasure]: Measure } = {
  [VolumeMeasure.ML]: {
    name: VolumeMeasure.ML,
    equivalentMetric: 0.001,
    type: MeasureType.VOLUME,
  },
  [VolumeMeasure.TBSP]: {
    name: VolumeMeasure.TBSP,
    equivalentMetric: 0.0147868,
    type: MeasureType.VOLUME,
  },
  [VolumeMeasure.CUP]: {
    name: VolumeMeasure.CUP,
    equivalentMetric: 0.236588,
    type: MeasureType.VOLUME,
  },
  [VolumeMeasure.FL_OZ]: {
    name: VolumeMeasure.FL_OZ,
    equivalentMetric: 0.0295735,
    type: MeasureType.VOLUME,
  },
};

export enum MassMeasure {
  G = 'g',
  LB = 'lb',
  OZ = 'oz',
}

export const massMeasureData: { [key in MassMeasure]: Measure } = {
  [MassMeasure.G]: {
    name: MassMeasure.G,
    equivalentMetric: 1,
    type: MeasureType.MASS,
  },
  [MassMeasure.LB]: {
    name: MassMeasure.LB,
    equivalentMetric: 453.592,
    type: MeasureType.MASS,
  },
  [MassMeasure.OZ]: {
    name: MassMeasure.OZ,
    equivalentMetric: 28.3495,
    type: MeasureType.MASS,
  },
};

export const measureData: { [key in MassMeasure | VolumeMeasure]: Measure } = {
  ...volumeMeasureData,
  ...massMeasureData,
};

export const getMeasureOfSameCategory = (measure: Measure): Array<Measure> => {
  if (measure.name in volumeMeasureData) {
    return Object.values(volumeMeasureData);
  }
  if (measure.name in massMeasureData) {
    return Object.values(massMeasureData);
  }

  return [];
};

export const defaultMeasure = measureData.g;

/**
 * Ingredient data.
 */
export type Ingredient = NamedData & {
  currentStock: number,
  measure: Measure,
  currentStockEquivalent: number,
  capacity: number,
  capacityMeasure: Measure,
  capacityEquivalent: number,
}

export const ensureIngredientValid = <T extends Ingredient>(ingredient: T): T => {
  const newIngredient = {...ingredient};

  if (newIngredient.measure.type !== newIngredient.capacityMeasure.type) {
    // Ingredient capacity measurement type must = ingredient in-stock measurement type
    newIngredient.capacityMeasure = getMeasureOfSameCategory(newIngredient.measure)[0];
  }

  // Calculate equivalents & check for capacity
  const capacityEquivalent = Math.round(
    newIngredient.capacity * newIngredient.capacityMeasure.equivalentMetric * 10000,
  );
  let stockEquivalent = Math.round(
    newIngredient.currentStock * newIngredient.measure.equivalentMetric * 10000,
  );

  stockEquivalent = Math.min(stockEquivalent, capacityEquivalent);

  // Update current stock according to equivalent (capped)
  newIngredient.currentStock = stockEquivalent / newIngredient.measure.equivalentMetric / 10000;

  return newIngredient;
};

/**
 * ID that means the ingredient is to be newly added.
 */
export const newIngredientId = '(new)';
