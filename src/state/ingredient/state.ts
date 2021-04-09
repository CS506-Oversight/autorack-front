import {StateBase} from '../base';
import {IngredientData} from './data';


export type IngredientState = StateBase & {
  ingredients: Array<IngredientData>,
  // Epoch time
  lastFetch: number,
}
