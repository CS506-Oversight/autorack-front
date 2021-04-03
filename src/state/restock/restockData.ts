export type RestockType = 'Manual' | 'Auto';

export type RestockStatusType = 'processing' | 'shipped' | 'completed';

/**
 * The base fields for every restock purchase.
 */
export type RestockItemInfo = {
    id: string;
    status: RestockStatusType;
    purchaseDate: string;
    totalPrice: number;
    type: RestockType;
}

/**
 * The base fields for every item purchased during
 * a restock purchase.
 */
export type ItemDataInfo = {
    description: string;
    unitPrice: number;
    quantity: number;
}

/**
 * A collection of all the items purchased during a
 * restock purchase
 */
export type Items = {
    itemsData: Array<ItemDataInfo>
}

export type RestockDataEntry = RestockItemInfo & Items;

export type RestockData = Array<RestockDataEntry>;
