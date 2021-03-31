import {StateBase} from '../base';
import {RestockData} from './restockData';

export type RestockState = StateBase & {
    restockData: RestockData | null;
}
