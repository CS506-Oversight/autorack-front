import {SynchronizedState} from '../base';
import {Ingredient} from './data';


export type IngredientState = SynchronizedState & {
  ingredients: Array<Ingredient>,
}
