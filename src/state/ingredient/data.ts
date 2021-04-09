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
    equivalentMetric: 0.24,
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

export const defaultMeasure = measureData.g;

/**
 * Ingredient data.
 */
export type Ingredient = {
  name: string,
  measure: Measure,
  unit: number,
  unitPrice: number,
  id: string,
}

/**
 * ID that means the ingredient is to be newly added.
 */
export const newIngredientId = '(new)';

export type UpsertIngredientPayload = {
  originalIngredients: Array<Ingredient>,
  updatedIngredients: Array<Ingredient>,
}
