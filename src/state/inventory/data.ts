import {NamedData} from '../base/data';
export type Inventory = NamedData & {
    amountInProgress: number,
    amountInProgressPercentage: number,
    amountInStock: number,
    amountInStockPercentage: number,
}
