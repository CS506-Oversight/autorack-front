import {StateBase} from '../base';
import {Ingredient} from './data';


export type IngredientState = StateBase & {
  ingredients: Array<Ingredient>,
  // Epoch time
  lastFetch: number,
}
